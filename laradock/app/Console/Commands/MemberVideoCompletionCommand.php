<?php

namespace App\Console\Commands;

use App\Mail\EmailNotification;
use App\Models\ContentPlayback;
use App\Models\CronSetting;
use App\Models\Notification;
use App\Models\Setting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class MemberVideoCompletionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:video-completion';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manda notifica email e in-dashboard quando un membro completa un video';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cron_setting = CronSetting::where('key','video-completion-executing')->where('value','0');
        
        if(
            $cron_setting->count()==0
        ) return 0;

        $cron_setting = CronSetting::where('key','video-completion-executing')->where('value','0');
        $cron_setting->update([
            'value' => 1
        ]);

        foreach(ContentPlayback::where('is_completed',1)->where('is_notified',0)->with(['user' => function($query){
            $query->where('user_type','team_member');
        },'content'])->get() as $content_playback){
            if(is_null($content_playback->user)) continue;
            $settings = $content_playback->user->getSettings();
            $content_playback->user->load('manager');
            $id_manager = $content_playback->user->manager->id_manager;
            $id_content = $content_playback->content->id;
            $content_name = $content_playback->content->name;
            $category = $content_playback->content->subcategory->category->name;
            $subcategory = $content_playback->content->subcategory->name;


            $settings = Setting::where('id_user',$id_manager);

            if($settings->count()){
                $settings = json_decode($settings->first()->settings);
                if(isset($settings->{'team-member-notif-all'}) || in_array($content_playback->id_user,explode(",",$settings->{'team-member-notif-list'}))){
                    if(isset($settings->{'team-member-notif-video-completed'})){
                        $notification = 'L utente '.$content_playback->user->firstname.' '.$content_playback->user->lastname.' ha completato il video '.$content_name.' presente nella categoria '.$category.' e sottocategoria '.$subcategory;

                        Notification::create([
                            'id_user' => $id_manager,
                            'notification' => $notification,
                            'is_read' => 0
                        ]);

                        $content_playback->update([
                            'is_notified' => 1
                        ]);

                        if(isset($settings->{'team-member-notif-video-completed-email'})){
                            //send email
                            Mail::to($content_playback->user->manager->email)->send(new EmailNotification($notification));
                        }
                    }
                }
            }
        }

        CronSetting::where('key','video-completion-executing')->where('value','1')->update([
            'value' => 0
        ]);

        return 0;
    }
}
