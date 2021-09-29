'use strict'
var express = require('express');
var router = express.Router();
let response  = require("express");
const csv = require('csvtojson')


exports.getIndexPage = async (req, res, next) => {
    res.render('index');
}
// method to compare the data with csv file
exports.postResponse = async (req, res, next) => {
    let choice = {
        t1: req.body.t1,
        t2: req.body.t2,
        t3: req.body.t3
    }
    if(choice.t1 == choice.t2||choice.t1 == choice.t3||choice.t2 == choice.t3){
        res.json({status: 200, data: ["No Trick", "No Trick", "No Trick"]});
        return;
    }
    const converter = csv()
    .fromFile('output.csv')
    .then((billboard) => {
        let actual = [];
        billboard.some(function(v){
            let value = v.Title+", "+v.Artist;
            if(value == choice.t1||value == choice.t2||value == choice.t3){
                actual.push(value);
            }
            return actual.length == 3;
        });
        if(actual.length != 3){
            res.json({status: 200, data: ["No Trick", "No Trick", "No Trick"]});
            return;
        }
        console.log(req.session);
        if(req.session.totalgame || req.session.totalgame == 0){
            req.session.totalgame+=1;
            
        }
        let cnt=0;
        if(actual[0] == choice.t1){
            if(req.session.totalcorrect || req.session.totalcorrect == 0){
                req.session.totalcorrect+=1;
            }
            cnt+=1
        }
        if(actual[1] == choice.t2){
            if(req.session.totalcorrect || req.session.totalcorrect == 0){
                req.session.totalcorrect+=1;
            }
            cnt+=1
        }
        if(actual[2] == choice.t3){
            if(req.session.totalcorrect || req.session.totalcorrect == 0){
                req.session.totalcorrect+=1;
            }
            cnt+=1
        }
        if(cnt==3){
            if(req.session.totalwin || req.session.totalwin == 0){
                req.session.totalwin+=1;
            }
        }
        

        res.json({status: 200, data: actual});
    });

}

exports.getStatisticPage = async (req, res, next) => {
    res.render('statistic');
}

exports.getStatisticData = async (req, res, next) => {
    const data = {
        totalgame: req.session.totalgame,
        totalwin: req.session.totalwin,
        totalcorrect: req.session.totalcorrect
    }
    res.json({
        data: data,
        status: 200
    })
}

exports.resetQuestion = async (req, res, next) => {
    let billboard;
    let arr = [...Array(100).keys()]
    let index1 = arr[Math.floor(Math.random()*100)];
    [arr[index1],arr[99]] = [arr[99],arr[index1]];
    let index2 =  arr[Math.floor(Math.random()*99)];
    [arr[index2],arr[98]] = [arr[98],arr[index2]];
    let index3 =  arr[Math.floor(Math.random()*98)];
    const converter = csv()
        .fromFile('output.csv')
        .then((billboard) => {
            let data = {
                name1: billboard[index1].Title+', '+billboard[index1].Artist,
                name2: billboard[index2].Title+', '+billboard[index2].Artist,
                name3: billboard[index3].Title+', '+billboard[index3].Artist
            }
            res.json({
                status: 200,
                data: data
            });
        });
    
}

exports.getUser = async (req, res, next) => {
    var username = req.session.username;
    res.json({
        status: 200,
        data: {username: username}
    })
}

exports.setName = async (req, res, next) => {
    var username = req.body.name;
    req.session.regenerate(function (err) {
            if (err) {
                return res.json({
                    status: 1,
                    msg: 'failed'
                });
            } else {
                req.session.username = username;
                req.session.totalgame = 0;
                req.session.totalwin = 0;
                req.session.totalcorrect = 0;
                res.json({
                    status: 200,
                    msg: 'success'
                });
            }
        });
}