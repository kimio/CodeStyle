'use strinct'
export class CodeReviewReport {
    private data:object = null;
    constructor(data:object){
        this.data = data;
    }
    public getTemplate():object{
        let countErrors:number = 0;
        let keys = Object.keys(this.data);
        keys.forEach(element => {
            countErrors+=this.data[element].length;
        });
        this.data["template"] = this.template(countErrors);
        return this.data;
    }
    private template(countErrors:number):object {
        let template = 
            {0:{
                castle:CodeReviewReport.setPositionTypeSize(0,"default",0),
                hero:false,
                bug:false
            },3:{
                castle:CodeReviewReport.setPositionTypeSize(0,"default",80),
                hero:CodeReviewReport.setPositionTypeSize(450,"walk",0),
                bug:false
            },6:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(80,"hit",0),
                bug:CodeReviewReport.setPositionTypeSize(80,"default",0)
            },10:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(70,"hit",0),
                bug:CodeReviewReport.setPositionTypeSize(0,"default",0)
            },30:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(60,"walk",0),
                bug:CodeReviewReport.setPositionTypeSize(70,"default",0)
            },50:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(40,"stand",0),
                bug:false
            },80:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(40,"hit",0),
                bug:CodeReviewReport.setPositionTypeSize(0,"default",0)
            },100:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(40,"walk",0),
                bug:CodeReviewReport.setPositionTypeSize(60,"default",0)
            },200:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(30,"walk",0),
                bug:false
            },300:{
                castle:false,
                hero:CodeReviewReport.setPositionTypeSize(0,"stand",0),
                bug:false
            },
        };
        let templates = Object.keys(template);
        var templateReturn = null;
        templates.forEach(errorTemplate => {
            if((!templateReturn) && countErrors<=parseInt(errorTemplate)){
                templateReturn = template[errorTemplate];
            }
        });
        return templateReturn
    }
    public static setPositionTypeSize(position:number,type:string,size:number):object{
        return {position:position,type:type,size:size};
    }

}