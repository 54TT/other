import styled from '/public/index.module.css'
import React from 'react';
import {  message,  } from 'antd';
export default function index() {
    const [messageApi, contextHolder] = message.useMessage()
    const clickLi=()=>{
        messageApi.open({
            type: 'warning',
            content: 'This feature is about to be launched. Please wait!',
        });
    }
    return (
        <>
            <div className={styled.box}>
                {/* */}
                <div className={styled.top}>
                    <div className={styled.topLeft}>
                        <img src="/Group2.png" alt="" width={'40px'}/>
                        <span className={styled.topLeftSpan}>orditools</span>
                    </div>
                    <ul className={styled.topRight}>
                        {contextHolder}
                        <li>Home</li>
                        <li onClick={clickLi}>Market</li>
                        <li onClick={clickLi}>Inscribe</li>
                        <li onClick={clickLi}>Minting Now</li>
                        <li onClick={clickLi}>FAQ</li>
                    </ul>
                </div>
                <div className={styled.brc}>
                    <img src="/btc1.png" alt="" style={{marginTop: "50px", zIndex: '10', maxHeight: '350px'}}
                         width={'100px'}/>
                    <div className={styled.brcCenter}>
                        <p className={styled.brcP}> brc-20 is an experimental standard that demonstrates that</p>
                        <p className={styled.brcP}> you can create fungible tokens on layer 1 Bitcoin by</p>
                        <p className={styled.brcP}>leveraging ordinal theory and inscriptions.</p>
                        <p style={{color: '#5F6168', textAlign: 'center'}}>Get started with Brc-20</p>
                        {/*<img src="/heading.png" alt="" width={'100%'} style={{zIndex:'10'}}/>*/}
                        <div style={{display: 'flex'}}>
                            <img src="/left1.png" width={'40%'} alt=""/>
                            <div style={{width: '30%', padding: '20px'}}>
                                <img src="/Group222.svg" style={{width: '70%', display: "block", margin: '0 auto'}}
                                     alt=""/>
                                {/*<div style={{*/}
                                {/*    width: '60%',*/}
                                {/*    borderRadius: '50%',*/}
                                {/*    margin: '0 auto',*/}
                                {/*    padding: '20px',*/}
                                {/*    backgroundColor: 'rgb(247,147,26)'*/}
                                {/*}}><img src="/Vector1.png" width={'100%'} alt=""/></div>*/}
                                <p style={{
                                    backgroundColor: 'rgb(244,193,67)',
                                    padding: '20px 0',
                                    marginTop: "20px",
                                    borderRadius: "10px",
                                    textAlign: 'center'
                                }}>Get inscribe</p>
                            </div>
                            <img src="/right1.png" width={'40%'} alt=""/>
                        </div>
                    </div>
                    <img src="/btc.png" alt="" style={{maxHeight: '350px'}} width={'100px'}/>
                    <div className={`${styled.back} ${styled.bb}`}></div>
                    <img src="/bg.png" alt="" style={{position: 'absolute', bottom: '0', left: '0'}} width={'100%'}/>
                </div>
                <div className={styled.show}>
                    <div>
                        <p>Market Capitalization</p>
                        <p>$1,864,351,833</p>
                    </div>
                    <div>
                        <p>24% increase or decrease</p>
                        <p style={{color: '#3BFF37'}}>24%</p>
                    </div>
                    <div>
                        <p>24h Trading Volume</p>
                        <p>$1,068,565,476</p>
                    </div>


                </div>
                <div className={styled.center}></div>
                <div className={styled.road}>
                    <p style={{color: '#5F6168'}}>Implementation plans</p>
                    <div><span>Road map</span> <span>View all</span></div>
                    <ul>
                        <li className={styled.borderColoF4}>
                            <div className={styled.borderColoF4}><p className={styled.backColoF4}></p></div>
                            <p style={{color: 'white', margin: '30px 0 50px'}}>2023 Q4</p>
                        </li>
                        <li className={styled.borderColoF4}>
                            <div className={styled.borderColoF4}><p className={styled.backColoF4}></p></div>
                            <p style={{color: 'white', margin: '30px 0 50px'}}>2023 Q4</p>
                        </li>
                        <li className={styled.borderColoF4}>
                            <div className={styled.borderColoF4}><p className={styled.backColoF4}></p></div>
                            <p style={{color: 'white', margin: '30px 0 50px'}}>2023 Q4</p>
                        </li>
                        <li className={styled.borderColoRg}>
                            <div className={styled.borderColoRg}><p className={styled.backColoRg}></p></div>
                            <p style={{color: 'white', margin: '30px 0 50px'}}>2023 Q4</p>
                        </li>
                        <div></div>
                    </ul>
                    <div style={{position: 'absolute', top: '-40%', left: '-12%', width: '16%'}}>
                        <img src="/btctt.png" width={'100%'} alt=""/>
                    </div>
                    <div className={`${styled.ee} ${styled.back}`}></div>
                </div>
                <div className={styled.about}>
                    <div>
                        <div>
                            <p>about</p>
                            <p>learn more</p>
                        </div>
                        <img src="/scheme.png" width={'30%'} alt=""/>
                    </div>
                    <div className={`${styled.cc} ${styled.back}`}></div>
                    <img src="/btc34.png" width={'15%'} alt=""/>
                </div>
                <div className={styled.get}>
                    <p>Get a quick overview for</p>
                    <div>
                        <img src="/tab.png" alt="" width={'32%'}/>
                        <img src="/tab2.png" alt="" width={'32%'}/>
                        <img src="/tab1.png" alt="" width={'32%'}/>
                    </div>
                </div>
                <img src="/sub.png" alt="" style={{width: '80%', display: 'block', margin: "0 auto"}}/>
                <div className={`${styled.aa} ${styled.back}`}></div>
                <div className={`${styled.dd} ${styled.back}`}></div>
                <p style={{color: '#5F6168', textAlign: 'center', marginTop: '100px'}}>@ORDITOOLS</p>
            </div>
        </>
    );
}
