import React, {useEffect, useState} from "react";
import {getParsedDaysArr} from "../../views/table-namespace";

interface propsI {
    range: string
}

export const ItemWeek = (props: propsI) => {

    const [dateArr, setDateArr] = useState<string[]>([])
    useEffect(() => {
        if (props.range) {
            const arr = getParsedDaysArr(props.range)
            setDateArr(arr)
        }
    }, [])
    const [weekArr, setWeekArr] = useState<string[]>([])
    useEffect(() => {
        if (dateArr.length > 0) {
            let arr: string[] = []
            dateArr.forEach((i, n) => {
                if (n % 7 === 0) {
                    arr.push(dateArr[n] + ' - ' + dateArr[n + 6])
                }
            })
            setWeekArr(arr)
        }
    }, [dateArr])

    return (
        <div className={'table_content_calendar_head_item'}>
            <div className={'table_content_calendar_head_item_week'}>
                {
                    weekArr.length > 0 && weekArr.map((i, n) => {
                        let arr = i.split(', ')
                        return (
                            <div className={'table_content_calendar_head_item_weeks'}
                                 key={`table_content_calendar_head_item_weeks-${n}`}
                            >
                                {arr[1] + (arr[3] ? ' - ' + arr[3] : '.....')}
                            </div>
                        )
                    })
                }
            </div>

            <div className={'table_content_calendar_head_item_days'}>
                {
                    dateArr.length > 0 && dateArr.map((i, n) => {
                        let arr = i.split(' ')
                        return (
                            <div className={[
                                'table_content_calendar_head_item_days_item',
                                (arr[0] === 'Sat,' || arr[0] === 'Sun,') && 'holiday'
                            ].join(' ')}
                                 key={`table_content_calendar_head_item_days_item-${n}`}
                            >
                                {arr[2].split(',')[0]}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}