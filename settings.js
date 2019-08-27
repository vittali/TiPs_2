var when = require("when");
var util = require("util");
var cfenv = require("cfenv");
var path = require("path");
var fs = require("fs");
var appEnv = cfenv.getAppEnv();
var userDir = __dirname;
var vcap = "<app name>_vcap.json";
var isRemote;

if ("VCAP_SERVICES" in process.env) {
  util.log("running in bluemix");
  userDir = path.join(__dirname, ".node-red");
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir);
  if (!fs.existsSync(path.join(userDir, "node_modules"))) fs.mkdirSync(path.join(userDir, "node_modules"));
  isRemote = true;
} else {
  util.log("running locally");
  var p = path.join(__dirname, vcap);
  process.env.VCAP_SERVICES = fs.readFileSync(p);
  isRemote = false;
}
var settings = module.exports = {
  uiPort: process.env.PORT || 1880,
  credentialSecret: <NR-flow access code>,
  adminAuth: {
    type: "credentials",
    users: [{
      username: <NR-editor username access code>,
      password: <NR-editor password access code>,
      permissions: "*"
    }],
  },
  disableEditor: isRemote,
  ui: isRemote ? {path: '/'} : "/ui",
  httpAdminRoot: isRemote ? "/544trandomPathiiii" : "/",
  mqttReconnectTime: 15000,
  debugMaxLength: 1000,
  flowFile: "flow.json",
  functionGlobalContext: {},
  logging: {
    console: {
      level: "debug",
      metrics: false,
      audit: false
    }
  }
};
