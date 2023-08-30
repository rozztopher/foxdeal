import React from 'react';

function BG() {

    const ellipses = [
        {
            width: '722px',
            height: '722px',
            left: '885px',
            top: '2112px',
            background: '#D41257',
            opacity: 0.1,
            filter: 'blur(800px)'
        },
        {
            width: '722px',
            height: '722px',
            left: '885px',
            top: '307px',
            background: '#D41257',
            opacity: 0.1,
            filter: 'blur(800px)'
        },
        {
            width: '275px',
            height: '275px',
            left: '1786px',
            top: '2175px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '722px',
            height: '722px',
            left: '885px',
            top: '380px',
            background: '#D41257',
            opacity: 0.1,
            filter: 'blur(800px)'
        },
        {
            width: '275px',
            height: '275px',
            left: '1584px',
            top: '2691px',
            background: '#44B3FA',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '275px',
            height: '275px',
            left: '1584px',
            top: '886px',
            background: '#D41257',
            opacity: 0.21,
            filter: 'blur(800px)'
        },
        {
            width: '461px',
            height: '461px',
            left: '36px',
            top: '2665px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(350px)'
        },
        {
            width: '411px',
            height: '411px',
            left: '61px',
            top: '1139px',
            background: '#44B3FA',
            opacity: 0.23,
            filter: 'blur(350px)'
        },
        {
            width: '309px',
            height: '309px',
            left: '1475px',
            top: '3308px',
            background: '#44B3FA',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '309px',
            height: '309px',
            left: '1475px',
            top: '1503px',
            background: '#44B3FA',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '309px',
            height: '309px',
            left: '185px',
            top: '93px',
            background: '#44B3FA',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '315px',
            height: '315px',
            left: '930px',
            top: '3150px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '315px',
            height: '315px',
            left: '930px',
            top: '1345px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '1078px',
            top: '2032px',
            background: '#44B3FA',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '1078px',
            top: '227px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '1335px',
            top: '3498px',
            background: '#D41257',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '1335px',
            top: '1693px',
            background: '#D41257',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '115px',
            top: '2045px',
            background: '#FF8C65',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
        {
            width: '238px',
            height: '238px',
            left: '115px',
            top: '240px',
            background: '#D41257',
            opacity: 0.3,
            filter: 'blur(300px)'
        },
    ]

    return (
        <div className='bg-elements'>
                {/* {
                    ellipses.map((ellipse, i) => {
                        return (
                            <div className='ellipse' key={'bg'+i} style={ellipse}></div>
                        )
                    })
                } */}
                <img src='/images/bg.png' alt='background' style={{width: '100vw', height: '100%'}}></img>
        </div>
    );
}

export default BG