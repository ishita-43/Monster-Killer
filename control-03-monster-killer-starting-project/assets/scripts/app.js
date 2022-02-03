const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE =  20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER ='GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster');
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;



adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry ={
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth,
    };
    switch(ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            battleLog.push(logEntry);
            break;

        case LOG_EVENT_PLAYER_STRONG_ATTACK:
        logEntry = { 
                  //  new object
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth
        }; 
        battleLog.push(logEntry);
            break;

        case LOG_EVENT_MONSTER_ATTACK:
        logEntry = { 
                //  new object
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth
        }; 
        battleLog.push(logEntry);
            break;

        case LOG_EVENT_PLAYER_HEAL:
        logEntry = { 
                //  new object
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth
        }; 
        battleLog.push(logEntry);
            break;

        case LOG_EVENT_GAME_OVER:
        logEntry = { 
                //  new object
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth
        }; 
        battleLog.push(logEntry);
            break;
            default:
            logEntry = {};
            battleLog.push(logEntry);

    }
//     if(event === LOG_EVENT_PLAYER_ATTACK){
        
//             //  new object
    
//         battleLog.push(logEntry);

//     } else if(ev=== LOG_EVENT_PLAYER_STRONG_ATTACK){
//         logEntry = {
//             //  new object
//             event: ev,
//             value: val,
//             target: 'MONSTER',
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth : playerHealth
//         };
//         battleLog.push(logEntry);

//     } else if(ev=== LOG_EVENT_MONSTER_ATTACK){
//         logEntry = {
//             //  new object
//             event: ev,
//             value: val,
//             target: 'PLAYER',
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth : playerHealth
//         };
//         battleLog.push(logEntry);

//     }else if(ev=== LOG_EVENT_GAME_OVER){
//         logEntry = {
//             //  new object
//             event: ev,
//             value: val,
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth : playerHealth
//         };
//         battleLog.push(logEntry);

    
// }

}
function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame();

}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -=playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);


    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead but bonus life saves you');
        setPlayerHealth(initialPlayerHealth);
    }

    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You Win');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
            );
        } else if(currentPlayerHealth <=0 && currentMonsterHealth >0){
            alert('You lost!');
            writeToLog(
                LOG_EVENT_GAME_OVER,
                'MONSTER WON',
                currentMonsterHealth,
                currentPlayerHealth
                );
        } else if(currentPlayerHealth <=0 && currentMonsterHealth <=0){
            alert('You have a draw');
            writeToLog(
                LOG_EVENT_GAME_OVER,
                'A DRAW',
                currentMonsterHealth,
                currentPlayerHealth
                );
        }
        if(currentMonsterHealth <= 0|| currentPlayerHealth <=0){
                reset();
            }
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function attackMonster(mode){
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = 
    mode === MODE_ATTACK ?
     LOG_EVENT_PLAYER_ATTACK : 
     LOG_EVENT_PLAYER_STRONG_ATTACK;

    // if(mode === MODE_ATTACK){
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK
    // } else if(mode === MODE_STRONG_ATTACK){
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
        );
    endRound();

}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);

}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal more than max initial health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
        );
    endRound();
}

function printLogHandler(){
// creatong dynamic value and at some time might want to stop   
// let randomNumbers = [];
// let finished = false;
// while(!finished){
//     const rndNumber = Math.random();
//     randomNumbers.push(rndNumber);
//     if(rndNumber > 0.5){
//         finished = true; LOOP terminated finished become falese
//         console.log(rndNumber);
//     }
// } 
// let j=0;
//    while(j<3){
//        console.log('.......');
//        j++;
//    }
    // for(let i=0;i<battleLog.length;i++){
    //     console.log('......');
    // }
// for loop alternative for for of loop
    // for(let i = 0; i <battleLog.length; i++){
    //     console.log(battleLog[i]);
    // }
// for of loop can also use let byt use cons t variable 
    let i = 0;
    //  if we want to use indec too than take one anothre variable 
    for(const logEntry of battleLog){
    //     console.log(element);
    // i++;
    // console.log(i);
    // }
        console.log(`#${i}`);
        for (const key in logEntry){
    //     console.log(key);
    //     console.log(logEntry[key]);
        console.log(`${key}=>${logEntry[key]}`);
        }
    i++;
        }
    
        // console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);