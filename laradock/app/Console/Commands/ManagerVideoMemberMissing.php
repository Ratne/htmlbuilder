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

class ManagerVideoMemberMissing extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:manager-video-member-missing';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a notification when it is the case a manager member missing videos';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cron_setting = CronSetting::where('key','video-manager-missing-executing')->where('value','0');
        
        if(
            $cron_setting->count()==0
        ) return 0;

        $cron_setting = CronSetting::where('key','video-manager-missing-executing')->where('value','0');
        $cron_setting->update([
            'value' => 1
        ]);


        $start_week = date('Y-m-d',strtotime('monday this week'));
        $end_week = date('Y-m-d',strtotime('monday this week'));


        foreach(User::where('user_type','team_manager')->get() as $user){
            $settings = $user->settings;
            if($settings){
                $settings = json_decode($settings->settings);

                if(isset($settings->{'team-member-notif-no-video-seen'}) && $settings->{'team-member-notif-no-video-seen'}=='on'){
                    $is_daily_video = isset($settings->{'team-member-notif-no-video-seen-video-time-period'}) && $settings->{'team-member-notif-no-video-seen-video-time-period'}=='on';
                    
                    foreach($user->members as $team_member){
                        if($is_daily_video){
                            $content_playback = ContentPlayback::where('id_user',$team_member->user->id)
                                ->whereDate('updated_at',Carbon::now()->format('Y-m-d'));
                                //->where('is_completed',0);
                        }else{
                            $content_playback = ContentPlayback::where('id_user',$team_member->user->id)
                                ->whereBetween('updated_at',[$start_week,$end_week]);
                                //->where('is_completed',0);
                        }

                        if(isset($settings->{'team-member-notif-no-video-seen-video-time'}) && $content_playback->count()<$settings->{'team-member-notif-no-video-seen-video-time'}){
                            $italian_time = Carbon::now()->format('H:i');//gmdate('H:i',strtotime("+2 hours",strtotime(gmdate('Y-m-d H:i:s'))));
                            $start  = new Carbon('2018-10-04 '.$settings->{'team-member-notif-no-video-seen-in-day-hour'}.':00');
                            $end    = new Carbon('2018-10-04 '.$italian_time.':00');

                            if($start->diffInMinutes($end)<=15 && $start->diffInHours($end)==0){

                                $notification = $team_member->user->name.' non ha visto video, ha visto solamente '.$content_playback->count().' video';
                                
                                if(Notification::where('notification','like','%'.$notification.'%')->where('id_user',$user->id)->whereDate('created_at',Carbon::now()->format('Y-m-d'))->count()>0) continue;
    
                                Notification::create([
                                    'id_user' => $user->id,
                                    'notification' => $notification,
                                    'is_read' => 0
                                ]);
    
                                if(isset($settings->{'team-member-notif-no-video-seen-email'}) && $settings->{'team-member-notif-no-video-seen-email'}=='on'){
                                    Mail::to($user->email)->send(new EmailNotification($notification));
                                }
                            }
                        }
                    }
                }

            }
        }


        CronSetting::where('key','video-manager-missing-executing')->where('value','1')->update([
            'value' => 0
        ]);


        return 0;
    }
}
