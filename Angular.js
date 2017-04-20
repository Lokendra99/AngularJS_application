
(function (){

var app=angular.module('cricketMatch',['ngRoute']); // module with no dependencies
    app.controller('allMatchDetails',('$http',function($http) {
        var matches = this;
        matches.member
        matches.hiding_value=false;
        matches.match_data_array = [];
        matches.data_per_team = [];
        matches.data_per_year=[];
        matches.team_wise_data=[];
        matches.score_wise_data=[];


       this.all_data_reveal_hide_condition=function(){
           document.getElementById('hiding').style.display = "none";
           console.log('total data hide');
        };
        this.other_score_year_wise_data_hide=function(){
            document.getElementById('score_data').style.display = "none";
            document.getElementById('reset2').value="Please select your choice";
            document.getElementById('year_wise').style.display = "none";
            document.getElementById('reset3').selectedIndex=0;
            document.getElementById('team_wise').style.display = "block";
            console.log('hide score year');
        };
        this.other_team_score_wise_data_hide=function(){
            document.getElementById('team_wise').style.display = "none";
            document.getElementById('reset1').selectedIndex=0;
            document.getElementById('score_data').style.display = "none";
            document.getElementById('reset2').value="Please select your choice";
            document.getElementById('year_wise').style.display = "block";

            console.log('hide team score');
        };
        this.other_team_year_wise_data_hide=function(){
            document.getElementById('team_wise').style.display = "none";
            document.getElementById('reset1').selectedIndex=0;
            document.getElementById('year_wise').style.display = "none";
            document.getElementById('reset3').selectedIndex=0;
            document.getElementById('score_data').style.display = "block";
            console.log('hide team year');
        };



            $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json').success(function (data) {
                console.log(data);// data coming from 1st API
                matches.match_data_array = data.rounds; // putting all the matches data array in one of the arrays
                $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json').success(function (data1) {
                    console.log(data1.rounds[0]);// data coming from 2nd API
                    for(var i=0; i<data1.rounds.length;i++){
                        matches.match_data_array.push(data1.rounds[i]) //adding matches data in the earlier created array to combine the data coming from both API.

                    }
                    //matches.match_data_array.push(data1.rounds);
                      console.log(matches.match_data_array);

                    matches.check_empty_rows=function () {
                        matches.rows = document.getElementById('tbl').rows;
                        for (var i=0; i<matches.rows.length; i++) {
                            var txt = matches.rows[i].textContent;
                            if (txt.trim()==="") {
                                return false;
                            }
                            else{
                               return true;
                            }
                        }

                    };


                    matches.match_data_array.forEach(function (currentvalue) {
                        currentvalue.matches.forEach(function (footlball_match_data) {
                            if(!matches.data_per_team[footlball_match_data.team1.key]){
                                matches.data_per_team[footlball_match_data.team1.key]= {
                                    total_matches_played: 1,
                                    total_won: 0,
                                    total_loss: 0,
                                    total_draw:0,
                                    total_goals:footlball_match_data.score1,
                                    average_performance:0



                                }

                            }
                            else{
                                matches.data_per_team[footlball_match_data.team1.key].total_matches_played++;
                                matches.data_per_team[footlball_match_data.team1.key].total_goals=matches.data_per_team[footlball_match_data.team1.key].total_goals +
                                    footlball_match_data.score1;
                                matches.data_per_team[footlball_match_data.team1.key].average_performance=Math.round((matches.data_per_team[footlball_match_data.team1.key].total_won/+
                                            matches.data_per_team[footlball_match_data.team1.key].total_matches_played)*100)+'%';
                            }
                            if(!matches.data_per_team[footlball_match_data.team2.key]){
                                matches.data_per_team[footlball_match_data.team2.key]={
                                    total_matches_played:1,
                                    total_won: 0,
                                    total_loss: 0,
                                    total_draw:0,
                                    total_goals:footlball_match_data.score2,
                                    average_performance:0
                                }

                            }
                            else{
                                matches.data_per_team[footlball_match_data.team2.key].total_matches_played++;
                                matches.data_per_team[footlball_match_data.team2.key].total_goals=matches.data_per_team[footlball_match_data.team2.key].total_goals +
                                    footlball_match_data.score2;
                                matches.data_per_team[footlball_match_data.team2.key].average_performance=Math.round((matches.data_per_team[footlball_match_data.team2.key].total_won/+
                                            matches.data_per_team[footlball_match_data.team2.key].total_matches_played)*100)+'%';

                            }

                            if(footlball_match_data.score1>footlball_match_data.score2)
                            {

                                matches.data_per_team[footlball_match_data.team1.key].total_won++;
                                matches.data_per_team[footlball_match_data.team2.key].total_loss++;

                            }

                            if (footlball_match_data.score1<footlball_match_data.score2){
                                matches.data_per_team[footlball_match_data.team1.key].total_loss++;
                                matches.data_per_team[footlball_match_data.team2.key].total_won++;
                            }

                            if(footlball_match_data.score1===footlball_match_data.score2) {
                                matches.data_per_team[footlball_match_data.team1.key].total_draw++;
                                matches.data_per_team[footlball_match_data.team2.key].total_draw++;

                            }




                        })


                    });

                     //year-wise
                    matches.yearly_data=function() {
                        matches.data_per_year[0] = "Please fill value";
                        matches.match_data_array.forEach(function (currentvalue) {
                            currentvalue.matches.forEach(function (footlball_match_data) {
                                var split_date = footlball_match_data.date.split('-')[0];
                                console.log(split_date);
                                if (!matches.data_per_year[split_date]) {
                                    matches.data_per_year[split_date] = [
                                        {
                                            Name_of_the_team1: footlball_match_data.team1.name,
                                            Name_of_the_team2: footlball_match_data.team2.name,
                                            Score_of_the_team1: footlball_match_data.score1,
                                            Score_of_the_team2: footlball_match_data.score2,
                                            Date: footlball_match_data.date
                                        }]
                                }
                                else {

                                    matches.data_per_year[split_date].push({
                                        Name_of_the_team1: footlball_match_data.team1.name,
                                        Name_of_the_team2: footlball_match_data.team2.name,
                                        Score_of_the_team1: footlball_match_data.score1,
                                        Score_of_the_team2: footlball_match_data.score2,
                                        Date: footlball_match_data.date
                                    })
                                }
                            })
                        });
                    };


                    //team_wise_data
                    matches.teamly_data=function () {


                        matches.match_data_array.forEach(function (currentvalue) {
                            currentvalue.matches.forEach(function (footlball_match_data) {
                                //var split_date=footlball_match_data.date.split('-')[0];
                                //console.log(split_date);
                                matches.team_wise_data[0] = "please fill value";
                                if (!matches.team_wise_data[footlball_match_data.team1.name]) {
                                    matches.team_wise_data[footlball_match_data.team1.name] = [
                                        {
                                            Name_of_the_team1: footlball_match_data.team1.name,
                                            Name_of_the_team2: footlball_match_data.team2.name,
                                            Score_of_the_team1: footlball_match_data.score1,
                                            Score_of_the_team2: footlball_match_data.score2,
                                            Date: footlball_match_data.date
                                        }]

                                }
                                else {
                                    matches.team_wise_data[footlball_match_data.team1.name].push({
                                        Name_of_the_team1: footlball_match_data.team1.name,
                                        Name_of_the_team2: footlball_match_data.team2.name,
                                        Score_of_the_team1: footlball_match_data.score1,
                                        Score_of_the_team2: footlball_match_data.score2,
                                        Date: footlball_match_data.date

                                    })
                                }

                                if (!matches.team_wise_data[footlball_match_data.team2.name]) {
                                    matches.team_wise_data[footlball_match_data.team2.name] = [
                                        {
                                            Name_of_the_team1: footlball_match_data.team1.name,
                                            Name_of_the_team2: footlball_match_data.team2.name,
                                            Score_of_the_team1: footlball_match_data.score1,
                                            Score_of_the_team2: footlball_match_data.score1,
                                            Date: footlball_match_data.date

                                        }]

                                }
                                else {

                                    matches.team_wise_data[footlball_match_data.team2.name].push({
                                        Name_of_the_team1: footlball_match_data.team1.name,
                                        Name_of_the_team2: footlball_match_data.team2.name,
                                        Score_of_the_team1: footlball_match_data.score1,
                                        Score_of_the_team2: footlball_match_data.score1,
                                        Date: footlball_match_data.date

                                    })
                                }
                            })
                        });
                    };
                    //score_wise_data
                    matches.scorely_data=function () {


                        matches.match_data_array.forEach(function (currentvalue) {
                            currentvalue.matches.forEach(function (footlball_match_data) {

                                if (!matches.score_wise_data[footlball_match_data.score1]) {
                                    matches.score_wise_data[footlball_match_data.score1] = [
                                        {
                                            Name_of_the_team1: footlball_match_data.team1.name,
                                            Name_of_the_team2: footlball_match_data.team2.name,
                                            Score_of_the_team1: footlball_match_data.score1,
                                            Score_of_the_team2: footlball_match_data.score2,
                                            Date: footlball_match_data.date
                                        }]
                                }
                                else {
                                    matches.score_wise_data[footlball_match_data.score1].push({
                                        Name_of_the_team1: footlball_match_data.team1.name,
                                        Name_of_the_team2: footlball_match_data.team2.name,
                                        Score_of_the_team1: footlball_match_data.score1,
                                        Score_of_the_team2: footlball_match_data.score2,
                                        Date: footlball_match_data.date
                                    })
                                }

                                if (!matches.score_wise_data[footlball_match_data.score2]) {
                                    matches.score_wise_data[footlball_match_data.score2] = [
                                        {
                                            Name_of_the_team1: footlball_match_data.team1.name,
                                            Name_of_the_team2: footlball_match_data.team2.name,
                                            Score_of_the_team1: footlball_match_data.score1,
                                            Score_of_the_team2: footlball_match_data.score2,
                                            Date: footlball_match_data.date

                                        }]

                                }
                                else {

                                    matches.score_wise_data[footlball_match_data.score2].push({
                                        Name_of_the_team1: footlball_match_data.team1.name,
                                        Name_of_the_team2: footlball_match_data.team2.name,
                                        Score_of_the_team1: footlball_match_data.score1,
                                        Score_of_the_team2: footlball_match_data.score2,
                                        Date: footlball_match_data.date

                                    })
                                }

                            })


                        });
                    };

                    //console.log(matches.data_per_year);
                console.log(matches.team_wise_data);
                 //console.log(matches.score_wise_data);
                 console.log(matches.score_wise_data);
             });

            });
        // };
    }));
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/all_data',{
                templateUrl:'all_data.html',
                controller:'allMatchDetails'

                })
            .when('/single_match_details',{
                templateUrl:'single_match_details.html',
                controller:'allMatchDetails'
            })
            .when('/statistical_data',{
                templateUrl:'statistical_data.html',
                controller:'allMatchDetails'

            })
    })


})();

