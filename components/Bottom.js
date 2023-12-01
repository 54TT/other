import React, {useContext} from 'react';
import styles from "/public/styles/all.module.css";
import Image from 'next/image'
import {CountContext} from "./Layout/Layout";
import {changeLang} from "/utils/set";

function Bottom(props) {
    const {changeFamily, changeTheme} = useContext(CountContext);
    const bottom = changeLang('bottom')
    return (
        <div style={{marginTop: '35px'}}>
            <div style={{marginBottom:"30px"}} className={`${styles.bottomBoxLogo} ${changeTheme ? 'darknessTwo' : 'brightTwo boxHover'}`}>
                <div className={styles.bottomTop}>
                    <div className={styles.bottomImg}>
                        <Image src="/video.png" alt="" width={100} height={100} style={{width: '100%'}}/>
                    </div>
                    <p className={`${styles.bottomSlign} ${changeTheme ? 'darknessFont' : 'brightFont'}`}>{bottom.video}</p>
                </div>
                <p className={`${styles.bottomText}`}
                   style={changeFamily !== 'english' ? {
                       letterSpacing: '2px',
                       color: changeTheme ? 'rgb(156,156,156)' : 'rgb(55, 55, 55)'
                   } : {color: changeTheme ? 'rgb(156,156,156)' : 'rgb(55, 55, 55)'}}>{bottom.introduce}</p>
            </div>
            <div className={`${styles['bottomBoxLogo']}  ${changeTheme ? 'darknessTwo' : 'brightTwo boxHover'}`}>
                <div className={styles.bottomImgs}>
                    <Image src="/TwitterX1.png" alt="" width={45} height={45}/>
                    <Image src="/TelegramApp.png" alt="" width={45} height={45}/>
                    <Image src="/Discord.png" alt="" width={45} height={45}/>
                    <Image src="/Medium.png" alt="" width={45} height={45}/>
                </div>
            </div>
            <div className={styles.bottomBot}
                 style={{color: changeTheme ? 'rgb(156,156,156)' : 'rgb(55, 55, 55)'}}>©DEXpert.io
            </div>
        </div>
    );
}

export default Bottom;