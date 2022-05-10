const mongoose = require('mongoose');

const {Schema} = mongoose;
const roomSchema = new Schema({
    //방 제목
    title: {
        type: String,
        required: true,
    },
    //최대 수용 인원
    max: {
        type:Number,
        required: true,
        default: 10,
        min: 2,
    },
    //방장
    owner: {
        type: String,
        required: true,
    },
    //비밀번호(required 속성이 없으므로 꼭 넣지 않아도 됨, 비밀번호를 설정하지 않으면 공개방)
    password: String,
    //생성 시간
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Room',roomSchema);