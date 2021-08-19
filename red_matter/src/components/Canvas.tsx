
import React, {useEffect, FunctionComponent} from 'react'

type TodoId = string;
type ColorCode =  string;

type Todo = {
    id: TodoId;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    color: ColorCode;
  };

  type TodosState = {
    list: Todo[];
  };

type reactProps = {
    rects: TodosState
  }

const Canvas: FunctionComponent<reactProps> = ({rects}) => {
    const { list } = rects;
    console.log(list)
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        var ctx = canvas.getContext("2d");
        ctx?.beginPath()
        for (let i=0; i < list.length; i++) {
            ctx!.fillStyle = list[i].color!;
            ctx?.fillRect(list[i].x!, list[i].y!, list[i].width!, list[i].height!);
            ctx?.stroke();
        }
    })
    
    return (
        <>
         <canvas id="myCanvas" width="400" height="400" style={{border: "1px solid black"}}></canvas>
        </>
    )
}

export default Canvas
