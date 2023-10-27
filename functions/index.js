const functions = require("firebase-functions");

import * as admin from "firebase-admin"
admin.initializeApp()
const env = functions.config();

import * as algoliasearch from 'algoliasearch'
const client = algoliasearch(env.algolia.appid,env.algolia.apikey)
const index = client.initindex('legendmp_index')

exports.indexUser = functions.firestore.document("general/{user}")