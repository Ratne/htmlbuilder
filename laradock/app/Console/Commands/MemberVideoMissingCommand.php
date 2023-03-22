<?php

namespace App\Console\Commands;

use App\Mail\EmailNotification;
use App\Models\ContentPlayback;
use App\Models\CronSetting;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

use function Ramsey\Uuid\v1;

class MemberVideoMissingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:member-video-missing';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a notification when it is the case the user has not seen any video during a period';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cron_setting = CronSetting::where('key','video-member-missing-executing')->where('value','0');
        
        if(
            $cron_setting->count()==0
        ) return 0;

        $cron_setting = CronSetting::where('key','video-member-missing-executing')->where('value','0');
        $cron_setting->update([
            'value' => 1
        ]);

        $start_week = date('Y-m-d',strtotime('monday this week'));
        $end_week = date('Y-m-d',strtotime('sunday this week'));

        foreach(User::where('user_type','team_member')->get() as $user){
            $settings = $user->settings;
            if($settings){
                $settings = json_decode($settings->settings);

                if(isset($settings->{'team-member-notif-no-video-seen'}) && $settings->{'team-member-notif-no-video-seen'}=='on'){
                    $is_daily_video = isset($settings->{'team-member-notif-no-video-seen-video-time-period'}) && $settings->{'team-member-notif-no-video-seen-video-time-period'}=='on';
                    if($is_daily_video){
                        $content_playback = ContentPlayback::where('id_user',$user->id)
                            ->whereDate('updated_at',Carbon::now()->format('Y-m-d'));
                            //->where('is_completed',0);
                    }else{
                        $content_playback = ContentPlayback::where('id_user',$user->id)
                            ->whereBetween('updated_at',[$start_week,$end_week]);
                            //->where('is_completed',0);
                    }

                    if(isset($settings->{'team-member-notif-no-video-seen-video-time'}) && $content_playback->count()<$settings->{'team-member-notif-no-video-seen-video-time'}){
                        $italian_time = Carbon::now()->format('H:i');//gmdate('H:i',strtotime("+2 hours",strtotime(gmdate('Y-m-d H:i:s'))));
                        $start  = new Carbon('2018-10-04 '.$settings->{'team-member-notif-no-video-seen-in-day-hour'}.':00');
                        $end    = new Carbon('2018-10-04 '.$italian_time.':00');

                        if($start->diffInMinutes($end)<=15 && $start->diffInHours($end)==0){
                            $notification = 'Non hai visto video';
                            
                            if(Notification::where('notification','like','%'.$notification.'%')->where('id_user',$user->id)->whereDate('created_at',Carbon::now()->format('Y-m-d'))->count()>0) continue;

                            Notification::create([
                                'id_user' => $user->id,
                                'notification' => $notification,
                                'is_read' => 0
                            ]);

                            if(isset($settings->{'team-member-notif-no-video-seen-email'}) && $settings->{'team-member-notif-no-video-seen-email'}=='on'){
                                //send email
                                Mail::to($user->email)->send(new EmailNotification($notification));
                            }
                        }
                    }
                }
            }
        }

        CronSetting::where('key','video-member-missing-executing')->where('value','1')->update([
            'value' => 0
        ]);

        return 0;
    }
}
