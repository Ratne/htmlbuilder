<?php

namespace App\Console\Commands;

use App\Mail\EmailNotification;
use App\Models\CronSetting;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class MemberReminderVideoCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:video-member-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reminds to watch at least one video to member';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cron_setting = CronSetting::where('key','video-member-reminder-executing')->where('value','0');
        
        if(
            $cron_setting->count()==0
        ) return 0;

        $cron_setting = CronSetting::where('key','video-member-reminder-executing')->where('value','0');
        $cron_setting->update([
            'value' => 1
        ]);


        $italian_time = Carbon::now()->format('H:i');//gmdate('H:i',strtotime("+2 hours",strtotime(gmdate('Y-m-d H:i:s'))));
        foreach(User::where('user_type','team_member')->get() as $team_member){
            if($team_member->settings==null) continue;
            $settings = !is_null($team_member->settings->settings) ? json_decode($team_member->settings->settings) : false;
            if($settings){
                if(isset($settings->{'team-member-notif-video-reminder'})){
                    if(isset($settings->{'team-member-reminder-in-day'}) && isset($settings->{'team-member-reminder-in-day-hour'})){
                        $dayhours = is_array($settings->{'team-member-reminder-in-day-hour'}) ? $settings->{'team-member-reminder-in-day-hour'} : [
                            $settings->{'team-member-reminder-in-day-hour'}
                        ];

                        foreach($dayhours as $dayhour){
                            $start  = new Carbon('2018-10-04 '.$dayhour.':00');
                            $end    = new Carbon('2018-10-04 '.$italian_time.':00');
                            $notification = 'Ricorda di vedere almeno un video oggi';
                            $how_much = $settings->{'team-member-reminder-in-day'};
    
                            if(Notification::where('notification','like','%'.$notification.'%')->where('id_user',$team_member->id)->whereDate('created_at',Carbon::now()->format('Y-m-d'))->count()>=$how_much) continue;
    
                            if($start->diffInMinutes($end)<=15 && $start->diffInHours($end)==0){
                                Notification::create([
                                    'id_user' => $team_member->id,
                                    'notification' => $notification,
                                    'is_read' => 0
                                ]);
                                if(isset($settings->{'team-member-video-reminder-email'})){
                                    //send email
                                    Mail::to($team_member->email)->send(new EmailNotification($notification));
                                }
                            }
                        }
                    }
                }
            }
        }

        CronSetting::where('key','video-member-reminder-executing')->where('value','1')->update([
            'value' => 0
        ]);

        return 0;
    }
}
