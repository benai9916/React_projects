import React, {useState, useEffect, FunctionComponent} from 'react'
import data from '../data.json';


const SecondChallenge: FunctionComponent = () => {
    var [result, setResult] = useState<boolean[]>([]);

    function insidePolygon(event: number[], dimX:number, dimY:number, gate: number[][]) {
        var x:number = event[dimX]
        var y:number = event[dimY]

        var inside:boolean = false;

        for (var i = 0, j = gate.length - 1; i < gate.length; j = i++) {
            var xi = gate[i][0], yi = gate[i][1];
            var xj = gate[j][0], yj = gate[j][1];

            var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }
        
        return inside;
    }


    let newarr: boolean[] = []
        useEffect(() => {
            
            for(var k=0; k < data.events.length; k ++) {
                var r = insidePolygon(data.events[k], Math.floor(Math.random()*4) + 0, Math.floor(Math.random()*4) + 0, data.gate)
                newarr.push(r)
                setResult(r => newarr)
                
        }   
        
    }, []) // eslint-disable-next-line 
   
    return (
        <>
        {result.length && (
            <>
            <h2>Second Assignment</h2>
            {data.events.map((itm, idx) => {
                return <div key={idx}>{`[${itm[0]}, ${itm[1]}, ${itm[2]}, ${itm[3]}] ==> ${result[idx]}`} </div>
            })}
            </>
        )}
        </>
    )
}

export default SecondChallenge
