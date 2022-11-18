import React from "react";
import {getDaysArray} from "../../views/table-namespace";

interface propsI {
    lvl: number
    text: string
    width: string
    childCount: number
    dateArr: string[]
}

export const ItemWork = (props: propsI) => {

    const dict = ['&#127988;', '&#127795;', '&#11088;', '&#128019;', '&#128018;']

    const start = props.width.split('/')[0]
    const end = props.width.split('/')[1]
    const width = getDaysArray(start, end).length * 22

    // find left value to set up padding for graphic
    const Months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const leftString = Number(props.width.split('/')[0].split('-')[1]) - 1
    const leftFindStr = Months[leftString] + ' ' + Number(props.width.split('/')[0].split('-')[2])
    let index: number = 0
    for (let x = 0; x < props.dateArr.length; x++) {
        if (props.dateArr[x].split(', ')[1] === leftFindStr) {
            index = x
        }
    }
    const left = index * 22 + 410

    return (
        <div className={
            [
                'table_content_work-items_item',
                `lvl${props.lvl}`,
            ].join(' ')
        }
        >
            <i dangerouslySetInnerHTML={{__html: dict[props.lvl - 1]}}></i>
            <i>{props.childCount}</i>
            <p>{props.text}</p>
            <div className={'table_content_work-items_item-graphic'}
                 style={{width: width, left: left}}
            >
                <p>{props.text}</p>
            </div>
        </div>
    )
}