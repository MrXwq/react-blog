'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };


// 所有的插件或者外置配置都需要配置到这里面 

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}