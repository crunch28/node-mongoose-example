const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        
        //개발환경이 아닐때 몽구스가 생성하는 쿼리내용 콘솔에서 확인하는 부분
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        //몽구스와 몽고디비를 연결하는 부분
        mongoose.connect('mongodb://root:1111@localhost:27017/admin', { //주소 형식 mongodb://[username:password@]host[:port][/[database][?options]] []은 있어도 되고 없어도 됨
            dbName: 'nodejs'
        }, (error) => {
            if (error) {
                console.error('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();

    //몽구스 커넥션 이벤트 리스너
    mongoose
        .connection
        .on('error', (error) => {
            console.error('몽고디비 연결 에러', error);
        });
    mongoose
        .connection
        .on('disconnected', () => {
            console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
            connect();
        })

    require('./user');
    require('./comment');
}