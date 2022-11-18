export interface chart {
    id?: number
    title?: string
    period_start?: string
    period_end?: string
    sub?: chart[]
}

export interface dataI {
    chart: chart
    period: string //"02.09.2022-31.12.2022"
    project: string //"DMS 2.0
}

export  function getDaysArray(start: string, end:string) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

export function getParsedDaysArr(range: string) {
    const start = range.split('-')[0].split('.')//.reverse().join('-')
    if (start[0] !== '01') start[0] = '01'
    const end = range.split('-')[1].split('.')//.reverse().join('-')
    if (end[0] !== '30' && end[0] !== '31') end[0] = '30'
    let arr = getDaysArray( // find difference between dates and put into arr
        start.reverse().join('-'),
        end.reverse().join('-')
    )
    const parsedArr: string[] = []
    arr.map(d => {
        parsedArr.push(d.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}).toString())
    })
    return parsedArr
}