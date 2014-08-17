'use strict';

angular.module('onigiriApp')
  .factory('Game', function (Util, Player, Log, Money, $filter) {
    var resultType = ['panel-success', 'panel-danger', 'panel-warning'];
    var resultStr = ['勝利', '敗北', '引き分け'];

    //出場校数
    var teamCount = 4096;
    var minMember = 9;
    //部員数LNのパラメータ
    var mu = 3.38;
    var sigma = .48;

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
      init : function(){
        //ランク付けされたチーム一覧を作成
        teams = [];
        for(var i = 0; i < teamCount; i++){
          teams.push(i);
        }
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
          enemyRank = (rank == 0) ? randDraw(teams, .1) : randDraw(teams);
        }
        //ランク順からメンバー数を算出する
        var enemyMembers = jStat.lognormal.inv(enemyRank / teamCount, mu, sigma) + minMember;
        var playerMembers = Player.total;
        var totalMembers = enemyMembers + playerMembers;

        var erank = jStat.lognormal.cdf( enemyMembers, mu, sigma );
        var frank = jStat.lognormal.cdf( playerMembers, mu, sigma );

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
        var money = (result == 0) ? (Math.pow(2,rank)) * 10000 : 0;

        Money.value += money;
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

        //引き分け
        if(result == 2){
          return;
        }
        //勝利
        if(result == 0){
          //練習試合でなければ他校も処理する
          if(rank > 0){
            this.gameOther();
          }
          //ランク上げる
          rank++;
          //優勝したらリセット
          if(rank >= gameRanks.length){
            rank = 0;
            this.init();
          }
        }
        //敗北
        else if(result == 1){
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
