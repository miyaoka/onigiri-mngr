'use strict';

angular.module('onigiriApp')
  .factory('Achievements', function (toaster, Time) {

    var Achievements = {
      list : [
        { id: 'mgr1', title : '高等部へきたけれど', desc : 'マネージャー入部' },
        { id: 'mgr2', title : 'ファイトファイト', desc : 'マネージャー10人' },
        { id: 'mgr3', title : '恋のキャッチボール', desc : 'マネージャー20人' },
        { id: 'rice1', title : 'まぼろしの米', desc : '初めての買い物' },
        { id: 'rice2', title : '苗づくり', desc : '米3㌧購入' },
        { id: 'rice3', title : '明日の実り', desc : '米10㌧購入' },
        { id: 'rice4', title : '龍錦の素顔', desc : '米50㌧購入' },
        { id: 'rice5', title : 'ファーマー', desc : '米100㌧購入' },
        { id: 'rice6', title : 'なないろの味', desc : '米1000㌧購入' },
        { id: 'game1', title : 'プレーボール', desc : '初めての試合' },
        { id: 'game2', title : '甲子園しかみえない', desc : '10点差以上で勝利' },
        { id: 'game3', title : '明日、勝ったら', desc : '地区大会決勝進出' },
        { id: 'game4', title : 'ウソみたいだろ', desc : '地区大会決勝敗退' },
        { id: 'game5', title : '甲子園に行くんだな', desc : '甲子園出場' },
        { id: 'game6', title : 'その後、おかわりは', desc : '甲子園優勝' },
        { id: 'money1', title: '与えられしもの', desc: '1000万円稼ぐ' },
        { id: 'money2', title: '沢山の思い出', desc: '1億円稼ぐ' },
        { id: 'money3', title: '翼を下さい', desc: '10億円稼ぐ' }
//        { id: 'time1', title : '第二部開始', desc : '2年目' },
//        { id: 'time2', title : 'バトンタッチ', desc : '卒業' }
      ],
      unlocked: {},
      unlock :function(id){
        if(this.unlocked[id]){
          return;
        }
        this.list.some(function(item){
          if(item.id != id){
            return false;
          }
          Achievements.unlocked[id] = Time.date;
          toaster.pop('success', '実績解除', item.title);
          return true;
        });
      }
    }
    return Achievements;
  });
