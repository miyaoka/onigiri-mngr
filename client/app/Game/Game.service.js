'use strict';

angular.module('onigiriApp')
  .factory('Game', function (Util, Player, Log, Money, $filter, Achievements) {
    var resultType = ['panel-success', 'panel-danger', 'panel-warning'];
    var resultStr = ['勝利', '敗北', '引き分け'];

    //出場校数
    var teamCount = 4096;
    var minMember = 9;
    //部員数LNのパラメータ
    // 1/4096 = 8.0, 4095/4096 = 184.8
    var mu = 3.65;
    var sigma = .45;

    var teams = [];
    var gameRanks = [
      '練習試合',
      '地区大会1回戦',//4096
      '地区大会2回戦',
      '地区大会3回戦',
      '地区大会準々決勝',
      '地区大会準決勝',
      '地区大会決勝',
      '甲子園1回戦',//64
      '甲子園2回戦',
      '甲子園3回戦',
      '甲子園準々決勝',
      '甲子園準決勝',
      '甲子園決勝'//2
    ];
    var rank = 0;
    var enemyRank;
    var rankLocalFinal = 6;
    var rankKoushien = 7;
    var winMoneyBaseLocal = 25000;
    var winMoneyPowerLocal = 2;
    var winMoneyBaseKoushien = 2000000;
    var winMoneyPowerKoushien = 2;

    function randDraw(list, max){
      if(!max){
        max = 1;
      }
      var i = Math.floor(Math.random()*list.length * max);
      var item = list[i];
      list.splice(i,1);
      return item;
    }

    var Game = {
      winLocalCount : 0,
      winKoushienCount : 0,
      lastLocalWin : 0,
      lastKoushienWin : 0,
      winLocalContinue : 1,
      winKoushienContinue : 1,
      init : function(){
        //ランク付けされたチーム一覧を作成
        teams = [];
        for(var i = 0; i < teamCount; i++){
          teams.push(i);
        }
        this.lastKoushienWin++;
        this.lastLocalWin++;
      },
      gameOther: function(){
        var winners = [];
        //２チームずつランク比較
        while(teams.length >= 2){
          var a = randDraw(teams);
          var b = randDraw(teams);
          //ランク数値が高いほうが勝利
          if(a > b){
            winners.push(a);
          }
          else{
            winners.push(b);
          }
        }
        //勝ち抜けチームに余りチームを加える
        teams = winners.concat(teams);
      },
      //週末の試合
      game : function(){

        //敵チームのランク取得（少ないほど弱い）
        if(enemyRank == null){
          //練習試合なら下位10%とだけ当たる
          enemyRank = (rank == 0) ? randDraw(teams, .1) : randDraw(teams);
        }
        //ランク順からメンバー数を算出する
        // （0 < p < 1 の範囲にする）
        var enemyMembers = jStat.lognormal.inv((enemyRank + 1) / (teamCount + 1), mu, sigma);
        var playerMembers = Player.total;
        var totalMembers = enemyMembers + playerMembers;


        //メンバー数比率を0-1で正規化
        var memberRatios = [
          enemyMembers / totalMembers,
          playerMembers / totalMembers
        ];

//        console.log(enemyMembers, playerMembers, memberRatios)

        var scores = [[],[]];
        var totals = [0,0];
        for(var team = 0; team < 2; team++){
          for(var i = 0; i < 9; i++){
            //底が.5の対数。0.5で1、0.001で9.96
            var r = Math.random();
            var score = Math.min(9, Math.floor( Util.logb(memberRatios[team] * .5, r)));
            scores[team][i] = score;
            totals[team] += score;
          }
        }

        //0:win, 1:lose, 2:draw
        var result = (totals[1] > totals[0]) ? 0 : (totals[1] < totals[0]) ? 1 : 2;
        var money = 0;
        if(result == 0){
          if(rank < rankKoushien){
            money = Math.pow(winMoneyPowerLocal, rank) * winMoneyBaseLocal;
            //地区大会優勝ボーナス
            if(rank==rankLocalFinal){
              money *= 1.5;
            }
          }
          else{
            money = Math.pow(winMoneyPowerKoushien, rank - rankKoushien) * winMoneyBaseKoushien;
          }
        }

        Money.count += money;
        Log.add(
          gameRanks[rank] + ' （' + resultStr[result] + '）',
          [
//            [
//              '戦力比:', $filter('number')(memberRatios[0]*100, 1), ,' : ', $filter('number')(memberRatios[1]*100, 1),
//            ].join(''),
            [
              ['敵軍', scores[0].join(' '), totals[0]].join(' | ')
//              $filter('number')(enemyMembers, 0) + '人'
            ].join(' '),
            [
              ['自軍', scores[1].join(' '), totals[1]].join(' | ')
//              $filter('number')(playerMembers) + '人'
            ].join(' '),
            [
              '（相手ランク: 全国', (teamCount - enemyRank), '位）'
            ].join(''),
            '+ ' + $filter('number')(money) + '円'
          ].join('<br>'),
          resultType[result]
        );

        Achievements.unlock('game1');

        //引き分け
        if(result == 2){
          return;
        }
        //勝利
        if(result == 0){
          if((totals[1]-totals[0]) >= 10){
            Achievements.unlock('game2');
          }
          //練習試合でなければ他校も処理する
          if(rank > 0){
            this.gameOther();
          }
          //地区大会決勝勝利
          if(rank == rankLocalFinal){
            this.winLocalCount++;

            var str;
            if(this.winLocalCount == 1){
              str = '初の'
            }
            else {
              if(this.lastLocalWin == 1){
                str = ++this.winLocalContinue + 'シーズン連続、';
              }
              else {
                str = this.lastLocalWin + 'シーズンぶり';
                this.winLocalContinue = 1;
              }
              str += this.winLocalCount + '度目の';
            }

            Log.add(
              '地区大会制覇！',
              [
                 str,
                '＿人人人人人人人＿',
                '＞　甲子園出場　＜',
                '￣Y^Y^Y^Y^Y^Y￣'
              ].join('<br>')
            );

            this.lastLocalWin = 0;
            Achievements.unlock('game5');
          }

          //ランク上げる
          rank++;

          //地区大会決勝進出
          if(rank == rankLocalFinal){
            Achievements.unlock('game3');
          }

          //優勝したらリセット
          if(rank >= gameRanks.length){
            this.winKoushienCount++;

            var str;
            if(this.winKoushienCount == 1){
              str = '初の'
            }
            else {
              if(this.lastKoushienWin == 1){
                str = ++this.winKoushienContinue + 'シーズン連続、';
              }
              else {
                str = this.lastKoushienWin + 'シーズンぶり';
                this.winKoushienContinue = 1;
              }
              str += this.winKoushienCount + '度目の';
            }

            Log.add(
              'おめでとう！',
              [
                str,
                '＿人人人人人人人＿',
                '＞　甲子園優勝　＜',
                '￣Y^Y^Y^Y^Y^Y￣'
              ].join('<br>')
            );

            this.lastKoushienWin = 0;
            Achievements.unlock('game6');
            rank = 0;
            this.init();
          }
        }
        //敗北
        else if(result == 1){
          //地区大会決勝敗退
          if(rank == rankLocalFinal){
            Achievements.unlock('game4');
          }

          rank = 0;
          this.init();
        }
        //敵リセット
        enemyRank = null;
      }
    };
    Game.init();
    return Game;
  });
