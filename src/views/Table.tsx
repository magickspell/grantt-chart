import React, {useEffect, useState} from "react";
import {ItemWork} from "../components/item-work/ItemWork";
import {dataI, getParsedDaysArr} from "./table-namespace";
import {ItemWeek} from "../components/item-week/ItemWeek";

require('./table.scss')

export const Table = () => {
    // fetch or mock data
    const [data, setData] = useState<dataI>({chart: {}, period: '', project: ''})
    useEffect(() => {
        fetch('http://localhost:3000/tmp/test.php').then(res => {
            if (res.ok) return res.json()
            throw new Error('cant fetch data!')
        }).then(body => {
            setData(body)
        }).catch((e) => {
            console.warn(e)
            alert(e)
        })
    }, [])
    // parse data to get Dates
    const [dateArr, setDateArr] = useState<string[]>([])
    useEffect(() => {
        if (data.period) {
            const arr = getParsedDaysArr(data.period)
            setDateArr(arr)
        }
    }, [data])

    return (
        <section className={'table_wrapper'}>
            {
                data.project
                    ? <div className={'table'}>
                        <header className={'table_header'}>
                            <h1>{data.project} / {data.period}</h1>
                            <button>
                                <span>&#8677;</span>
                                Export
                            </button>
                        </header>
                        <div className={'table_content_shadow-right'}></div>
                        <div className={'table_content'}>
                            <div className={'table_content_work-items'}>
                                <div className={'table_content_work-items_head'}>Work item</div>
                                <div className={'table_content_work-items_head-empty'}></div>
                                {
                                    data.chart && <details>
                                        <summary>
                                            <ItemWork
                                                width={data.chart.period_start + '/' + data.chart.period_end}
                                                lvl={1}
                                                text={data.chart.title!}
                                                childCount={(data.chart.sub) ? data.chart.sub.length : 0}

                                                dateArr={dateArr}
                                            />
                                        </summary>
                                        {
                                            data.chart.sub && data.chart.sub.map((i) => {
                                                return (<details key={`item-level-2-f-${i.id}`}>
                                                    <summary>
                                                        <ItemWork key={`item-level-2- + ${i.id}`}
                                                                  width={i.period_start + '/' + i.period_end}
                                                                  lvl={2}
                                                                  text={i.title!}
                                                                  childCount={(i.sub) ? i.sub.length : 0}
                                                                  dateArr={dateArr}
                                                        />
                                                    </summary>
                                                    {
                                                        i.sub && i.sub.map((i2) => {
                                                            return (<details key={`item-level-3-f-${i2.id}`}>
                                                                <summary>
                                                                    <ItemWork key={`item-level-3- + ${i2.id}`}
                                                                              width={i2.period_start + '/' + i2.period_end}
                                                                              lvl={3}
                                                                              text={i2.title!}
                                                                              childCount={(i2.sub) ? i2.sub.length : 0}
                                                                              dateArr={dateArr}
                                                                    />
                                                                </summary>
                                                                {
                                                                    i2.sub && i2.sub.map((i3) => {
                                                                        return (<details key={`item-level-4-f-${i3.id}`}>
                                                                            <summary>
                                                                                <ItemWork key={`item-level-4- + ${i3.id}`}
                                                                                          width={i3.period_start + '/' + i3.period_end}
                                                                                          lvl={4}
                                                                                          text={i3.title!}
                                                                                          childCount={(i3.sub) ? i3.sub.length : 0}
                                                                                          dateArr={dateArr}
                                                                                />
                                                                            </summary>
                                                                            {
                                                                                i3.sub && i3.sub.map((i4) => {
                                                                                    return (<React.Fragment key={`item-level-5-f-${i4.id}`}>
                                                                                        <ItemWork key={`item-level-5- + ${i4.id}`}
                                                                                                  width={i4.period_start + '/' + i4.period_end}
                                                                                                  lvl={5}
                                                                                                  text={i4.title!}
                                                                                                  childCount={(i4.sub) ? i4.sub.length : 0}
                                                                                                  dateArr={dateArr}
                                                                                        />
                                                                                    </React.Fragment>)
                                                                                })
                                                                            }
                                                                        </details>)
                                                                    })
                                                                }
                                                            </details>)
                                                        })
                                                    }
                                                </details>)
                                            })
                                        }
                                    </details>
                                }

                            </div>

                            <div className={'table_content_calendar'}>
                                <div className={'table_content_calendar_head'}>
                                    <ItemWeek range={data.period}/>
                                </div>

                                <div className={'table_content_calendar_columns'}>
                                    {
                                        dateArr.length > 0
                                            ? dateArr.map((i, n) => {
                                                return (
                                                    <div className={'table_content_calendar_columns_item'}
                                                         key={'table_content_calendar_columns_item-' + n}
                                                         id={`${i.split(', ')[1]}`}
                                                    ></div>
                                                )
                                            })
                                            : <b>Loading</b>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    : <b>Loading...</b>
            }
        </section>
    )
}