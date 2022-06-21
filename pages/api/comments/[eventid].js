
function handler(req,res){
    const eventId = req.query.eventId
    // res.status(200).json({eventId:eventId})
if(req.method === "POST"){
    const {email,name,text} = req.body
    if(!email.includes('@')||!name||name.trim() ===""||!text||text.trim()===''){
        res.status(422).json({massage:"无效输入"})
        return;
    }
    console.log(email,name,text)
    const newComment={
        id:new Date().toISOString(),
        email,name,text
    }
    res.status(201).json({message:"添加评论成功！",comment:newComment})
}else if(req.method === "GET"){
const dummyList = [
   { id:"c1",name:"liChang1",text:"评论内容1"},
   { id:"c2",name:"liChang2",text:"评论内容2"}
]
res.status(200).json({comment:dummyList})
}
}
export default handler