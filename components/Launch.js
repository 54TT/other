import React, {useEffect, useRef, useState} from "react";
import dayjs from 'dayjs';
import {notification, Pagination, Table, Card, Statistic} from "antd";
import {get} from "../utils/axios";
import {GlobalOutlined, SendOutlined, TwitterOutlined} from "@ant-design/icons";
import {dao} from '/utils/set'
import baseUrl from "../utils/baseUrl";
const {Countdown} = Statistic;

export default function Presale() {
    const [launchPageSize, setLaunchPageSize] = useState(10);
    const [launchCurrent, setLaunchCurrent] = useState(1);
    const [launchAll, setLaunchAll] = useState(0);
    const [launch, setLaunch] = useState([]);
    const [launchBol, setLaunchBol] = useState(true);
    const hint = () => {
        notification.error({
            message: `Please note`, description: 'Error reported', placement: 'topLeft',
            duration: 2
        });
    }
    const getParams = (url, params) => {
        get(url, params).then((res) => {
            if (res.status === 200) {
                let {data, count} = res.data
                setLaunch(data && data.length > 0 ? data : [])
                setLaunchAll(count && count.length > 0 ? count[0].count : 0)
                setLaunchBol(false)
            }
        }).catch(err => {
            setLaunch([])
            setLaunchAll(0)
            setLaunchBol(false)
            hint()
        })
    }
    const [diffTime, setDiffTime] = useState(null)
    const refSet = useRef(null)
    useEffect(() => {
        refSet.current = setInterval(() => setDiffTime(diffTime - 1), 1000)
        return () => {
            clearInterval(refSet.current)
        }
    }, [diffTime])
    useEffect(() => {
        getParams('/queryLaunch', {
            pageIndex: launchCurrent - 1,
            pageSize: launchPageSize
        },)
    }, []);
    const push = (record, name) => {
        if (name === 'a') {
            window.open(record.telegram)
        } else if (name === 'b') {
            window.open(record.twitter)
        } else {
            window.open(record.website.includes('http') ? record.website : 'https://' + record.website)
        }
    }
    const getD = (a) => {
        if (a) {
            return Date.now() + Number(a) * 1000
        } else {
            return 0
        }
    }
    const columns = [
        {
            title: '',
            dataIndex: 'address',align: 'center',
            width: 30,
            render: (_, record) => {
                return <p style={{
                    width: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#454545',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '30px'
                }}>{record?.symbol?.slice(0, 1)}</p>
            }
        },
        {
            title: 'Token name',
            dataIndex: 'name',align: 'center',width: '25%',
            render: (text) => {
                return <p style={{fontWeight: 'bold', fontSize: '18px', textAlign: 'center'}}>{text}</p>
            }
        },
        {
            title: 'Token symbol',
            dataIndex: 'symbol',align: 'center',
            render: (text) => {
                return <p style={{fontWeight: 'bold', fontSize: '18px', textAlign: 'center'}}>{text}</p>
            }
        },
        {
            title: 'Social Info',
            dataIndex: 'address',align: 'center',
            width: 200,
            render: (text, record) => {
                return <div
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <GlobalOutlined style={{cursor: 'pointer', fontSize: '20px'}} onClick={() => push(record, 'one')}/>
                    <TwitterOutlined style={{cursor: 'pointer', fontSize: '20px'}} onClick={() => push(record, 'two')}/>
                    <SendOutlined style={{cursor: 'pointer', fontSize: '20px'}} onClick={() => push(record, 'three')}/>
                </div>
            }
        },
        {
            title: 'Launch time',
            dataIndex: 'launch_time',align: 'center',
            sorter: {
                compare: (a, b) => {
                    const data = a.launch_time ? dayjs(a.launch_time).format('YYYY-MM-DD HH:mm:ss') : 0
                    const pa = b.launch_time ? dayjs(b.launch_time).format('YYYY-MM-DD HH:mm:ss') : 0
                    return dayjs(pa).isBefore(data)
                }
            },
            render: (text, record) => {
                if (text) {
                    return  <Countdown title=""
                                       value={getD(dayjs(text).isAfter(dayjs()) ? dayjs(text).diff(dayjs(), 'seconds') : '')}
                                       format="HH:mm:ss"/>
                } else {
                    return <p style={{textAlign: 'center'}}>0</p>
                }
            }
        },
        {
            title: 'Platform',
            dataIndex: 'launch_platform_logo',align: 'center',
            render: (text) => {
                return <img src={baseUrl+text} alt="" width={'30px'} style={{display:'block',borderRadius:'50%',margin:'0 auto'}}/>
            }
        },
        {
            title: 'DEX', align: 'center', render: (text, record) => {
                return <img src="/dex-uniswap.png" alt="" width={'30px'} style={{borderRadius:'50%',display:'block',margin:'0 auto'}}/>
            }
        },
    ];

    const change = (e, a) => {
        setLaunchCurrent(e)
        setLaunchPageSize(a)
    }
    return (
        <div style={{marginRight: '20px'}}>
            <Card style={{
                minWidth: 700,
                backgroundColor: 'rgb(253, 213, 62)',
                width: '100%', border: 'none'
            }}>
                <div style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src="/Group.png" alt="" width={70} height={70}/>
                        <span style={{fontWeight: 'bold', fontSize: '26px'}}> Launching Soon</span>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'end', marginBottom: '20px'}}>
                    <Pagination defaultCurrent={1} current={launchCurrent} showSizeChanger onChange={change}
                                total={launchAll} pageSize={launchPageSize}/>
                </div>
                <Table className={`presale anyTable`} bordered={false} columns={columns} loading={launchBol}
                       dataSource={launch} rowKey={(record) => record.symbol + record.address}
                       pagination={false} rowClassName={(record) => {
                    return 'oneHave'
                }}/>
            </Card>
            <p style={{
                marginTop: '80px',
                textAlign: 'center',
                lineHeight: '1',
                fontSize: '20px',
                color: 'rgb(98,98,98)'
            }}>©DEXpert.io</p>
        </div>
    )
}
