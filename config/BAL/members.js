const mongoose = require('mongoose')
const Member = require("../../models/Member")



function addMember(){
    const newMember = {
        googleId: profile.id,
        displayName: profile.name.givenName + " " + profile.name.familyName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }
    try {
        let member = await Member.findOne({ id: profile.id })
        if (member) {
            done(null, member);
        }
        else {
            member = await Member.create(newMember)
            done(null, member)
        }
    }
    catch (err) {
        console.log(`Error Occured while resolving user ${err}`)
    }
}

function addMember(){
    const newMember = {
        googleId: profile.id,
        displayName: profile.name.givenName + " " + profile.name.familyName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }
    try {
        let member = await Member.findOne({ id: profile.id })
        if (member) {
            done(null, member);
        }
        else {
            member = await Member.create(newMember)
            done(null, member)
        }
    }
    catch (err) {
        console.log(`Error Occured while resolving user ${err}`)
    }
}

module.exports.Member = Member;


