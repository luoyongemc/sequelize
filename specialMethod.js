const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./dataBaseConnect');

const Foo = sequelize.define('foo',{
    name:DataTypes.STRING,
},{timestamps:false});

const Bar = sequelize.define('bar',{
    name:DataTypes.STRING,
},{timestamps:false});

Foo.hasOne(Bar);


// sequelize.sync({force:true});//创建两张表
// console.log('所有模型均已同步成功');
async function test() {
    
    const foo = await Foo.create({name:'the-foo'});
    const bar1 = await Bar.create({name:'some-bar'});
    const bar2 = await Bar.create({name:'another-bar'});

    console.log(await foo.getBar());//null

    await foo.setBar(bar1);
    console.log((await foo.getBar()).name);//null

}

test();

