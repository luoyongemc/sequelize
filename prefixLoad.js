const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./dataBaseConnect');

const Man = sequelize.define('man', { name: DataTypes.STRING }, { timestamps: false });
const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
const Tool = sequelize.define('tool', {
  name: DataTypes.STRING,
  size: DataTypes.STRING
}, { timestamps: false });
Man.hasMany(Task);
Task.belongsTo(Man);
Man.hasMany(Tool, { as: 'Instruments' });


// sequelize.sync({force:true});//创建两张表
// console.log('所有模型均已同步成功');

const test = async () => {
  // const man1 = await Man.create({name:'John Doe'});
  // const task1 = await Task.create({name:'扫地',manId:1});

  const tasks = await Task.findAll({ include: Man });
  console.log(JSON.stringify(tasks, null, 2));

  const users = await Man.findAll({include:Task});
  console.log(JSON.stringify(users, null, 2));

  const men = await Man.findAll({
    include: { model: Tool, as: 'Instruments' }
  });
  console.log(JSON.stringify(men, null, 2));


}

// test();


const test2 = async() => {
  const Foo = sequelize.define('Foo', { name: DataTypes.TEXT });
  const Bar = sequelize.define('Bar', { name: DataTypes.TEXT });
  Foo.belongsToMany(Bar, { through: 'Foo_Bar' });
  Bar.belongsToMany(Foo, { through: 'Foo_Bar' });
  
  await sequelize.sync();
  const foo = await Foo.create({ name: 'foo' });
  const bar = await Bar.create({ name: 'bar' });
  await foo.addBar(bar);
  const fetchedFoo = await Foo.findOne({ include: Bar });
  console.log(JSON.stringify(fetchedFoo, null, 2));
}

test2();
