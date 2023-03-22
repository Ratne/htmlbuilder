<?php

namespace App\Console\Commands;

use App\Mail\EmailNotification;
use App\Models\ContentCategory;
use App\Models\ContentPlayback;
use App\Models\ContentSubcategory;
use App\Models\CronSetting;
use App\Models\Notification;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class MemberSubcategoryCompletionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:subcategory-completion';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a notificaiton or email when at least 80% of the subcategory is completed';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cron_setting = CronSetting::where('key','subcategory-completion-executing')->where('value','0');
        
        if(
            $cron_setting->count()==0
        ) return 0;

        $cron_setting = CronSetting::where('key','subcategory-completion-executing')->where('value','0');
        $cron_setting->update([
            'value' => 1
        ]);

        $arr = [];
        foreach(ContentSubcategory::with('content')->get() as $category){
            //$arr[$category->id] = $category->subcategories->count();
            $arr[$category->id] = $category->content->count();
        }

        foreach($arr as $key => $total_content){
            $content_playback = ContentPlayback::leftJoin('contents','content_playbacks.id_content','=','contents.id')
                ->leftJoin('content_subcategories','contents.id_subcategory','=','content_subcategories.id')
                ->where('content_subcategories.id',$key)
                ->where('is_completed',1)
                ->where('is_notified_subcategory',0)
                ->select(['content_playbacks.id','id_user','content_subcategories.name']);

            $total_content_completed_in_category = $content_playback->count();
            
            $percentage_category = intval(($total_content*80)/100);

            $processed = [];
            if($content_playback->count()>0 && $total_content_completed_in_category>=$percentage_category){
                foreach($content_playback->get() as $playback){
                    $user = User::findOrFail($playback->id_user);
                    if($user->user_type=='team_member'){
                        $user->load('manager');
                        $settings = Setting::where('id_user',$user->manager->manager->id);
                        if($settings->count()){
                            $settings = json_decode($settings->first()->settings);

                            if(isset($settings->{'team-member-notif-all'}) || in_array($playback->id_user,explode(",",$settings->{'team-member-notif-list'}))){
                                if(isset($settings->{'team-member-notif-subcategory-completed'})){
                                    ContentPlayback::findOrFail($playback->id)->update([
                                        'is_notified_subcategory' => 1
                                    ]);

                                    $notification = 'L utente '.$user->firstname.' '.$user->lastname.' ha completato la sottocategoria '.$playback->name;

                                    if(in_array($playback->id_user.'_'.$notification,$processed)) continue;
                                    array_push($processed,$playback->id_user.'_'.$notification);
                                    
                                    Notification::create([
                                        'id_user' => $user->manager->manager->id,
                                        'notification' => $notification,
                                        'is_read' => 0
                                    ]);
    
                                    if(isset($settings->{'team-member-notif-subcategory-completed-email'})){
                                        //send email
                                        Mail::to($user->manager->manager->email)->send(new EmailNotification($notification));
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        }

        CronSetting::where('key','subcategory-completion-executing')->where('value','1')->update([
            'value' => 0
        ]);

        return 0;
    }
}
