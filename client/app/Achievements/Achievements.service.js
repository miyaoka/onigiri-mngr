'use strict';

angular.module('onigiriApp')
  .factory('Achievements', function (toaster) {
    var list = {
      'mgr1': { title : '高等部へきたけれど', desc : 'マネージャー入部' },
      'mgr2': { title : 'ファイトファイト', desc : 'マネージャー5人' },
      'mgr3': { title : '恋のキャッチボール', desc : 'マネージャー10人' },
      'rice1': { title : 'まぼろしの米', desc : '初めての買い物' },
      'rice2': { title : '苗づくり', desc : '米1㌧購入' },
      'rice3': { title : '明日の実り', desc : '米2㌧購入' },
      'rice4': { title : '龍錦の素顔', desc : '米3㌧購入' },
      'rice5': { title : 'ファーマー', desc : '米4㌧購入' },
      'rice6': { title : 'なないろの味', desc : '米5㌧購入' },
      'game1': { title : 'プレーボール', desc : '初めての試合' },
      'game2': { title : '甲子園しかみえない', desc : '10点差以上で勝利' },
      'game3': { title : '明日、勝ったら', desc : '地区大会決勝進出' },
      'game4': { title : 'ウソみたいだろ', desc : '地区大会決勝敗退' },
      'game5': { title : '甲子園に行くんだな', desc : '甲子園出場' },
      'game6': { title : 'その後、おかわりは', desc : '甲子園優勝' },
      'time1': { title : '第二部開始', desc : '2年目' },
      'time2': { title : 'バトンタッチ', desc : '卒業' }
    }

    var Achievements = {
      unlocked: {},
      get unlockedList(){

      },
      unlock :function(item){
        if(this.unlocked[item]){
          return;
        }
        this.unlocked[item] = true;
        toaster.pop('success', list[item].title, list[item].desc);
      }
    }
    return Achievements;
  });
