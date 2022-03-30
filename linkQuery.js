const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const sequelize = require('./dataBaseConnect');

const Ship = sequelize.define('ship',{
    name:DataTypes.STRING,
    crewCapacity:DataTypes.INTEGER,
    amountOfSails:DataTypes.INTEGER
},{timestamps:false});



const Captain = sequelize.define('captain',{
    name:DataTypes.STRING,
    skillLevel:{
        type:DataTypes.INTEGER,
        validate:{min: 1,max:10}
    }
},{timestamps:false});



Captain.hasOne(Ship);
Ship.belongsTo(Captain);

// sequelize.sync({force:true});//创建两张表
// console.log('所有模型均已同步成功');


//添加数据
// Captain.create({name:'Jack Sparrow',skillLevel:8});
// Ship.create({name:'dva',crewCapacity:5,amountOfSails:6,captainId:1});


async function  test() {
    //延迟加载
    // const awesomeCaptain = await Captain.findOne({
    //     where:{
    //         name:'Jack Sparrow'
    //     }
    // });

    // console.log('name:',awesomeCaptain.name);
    // console.log('skill level:',awesomeCaptain.skillLevel);

    // const hisShip = await awesomeCaptain.getShip();
    // console.log('Ship Name:', hisShip.name);
    // console.log('Amount of Sails:', hisShip.amountOfSails);

    //预先加载
    const awesomeCaptain = await Captain.findOne({
        where:{
            name:'Jack Sparrow'
        },
        include:Ship
    })
    // 现在 ship 跟着一起来了
    console.log('Name:', awesomeCaptain.name);
    console.log('Skill Level:', awesomeCaptain.skillLevel);
    console.log('Ship Name:', awesomeCaptain.ship.name);
    console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);


    console.log('---------------------');
    console.log((await Ship.findAll({ include: Captain })));
}

test();


