const puppeteer = require("puppeteer");
const electron = require('electron');
const {remote, ipcRenderer} = electron;

const path = require('path'); 

const dialog = electron.remote.dialog; 
var uploadFile = document.getElementById('upload'); 
  

global.filepath = undefined; 
var isiCapt;

uploadFile.addEventListener('click', () => { 
  // If the platform is 'win32' or 'Linux' 
      if (process.platform !== 'darwin') { 
      
          dialog.showOpenDialog({ 
              title: 'pilih file', 
              defaultPath: path.join(__dirname, '../assets/'), 
              buttonLabel: 'UPLOAD', 
  
              filters: [ 
                  { 
                      name: 'image Files', 
                      extensions: ['txt', 'docx','jpg','jpeg','png'] 
                  }, ], 
   
              properties: ['openFile'] 
          }).then(file => { 
              
              console.log(file.canceled); 
              
              if (!file.canceled) { 
                
                global.filepath = file.filePaths[0].toString(); 
                console.log(global.filepath); 
              }   
          }).catch(err => { 
              console.log(err)  
          }); 
      } 
      else { 
          // If the platform is 'darwin' (macOS) 
          dialog.showOpenDialog({ 
              title: 'pilih file', 
              defaultPath: path.join(__dirname, '../assets/'), 
              buttonLabel: 'UPLOAD', 
              filters: [ 
                  { 
                      name: 'image Files', 
                      extensions: ['txt', 'docx','jpg','jpeg','png'] 
                  }, ], 
             
              properties: ['openFile', 'openDirectory'] 
          }).then(file => { 
              console.log(file.canceled); 
              if (!file.canceled) { 
                global.filepath = file.filePaths[0].toString(); 
                console.log(global.filepath); 
              }   
          }).catch(err => { 
              console.log(err) 
          }); 
      } 
  }); 


var coba = document.getElementById('coba');
coba.addEventListener('click', postPostingan)

function postPostingan(){
  var isiCapt = document.getElementById('isiCapt').value;

  (async () => {


    browser = await puppeteer.launch({

      //executablePath: exPath,
      "headless":true,
      "slowMo":0
    });
  
    const page = await browser.newPage();
   
    
    
   await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.93 Mobile Safari/537.36');
   await page.setDefaultNavigationTimeout(0);
  
   
   await page.goto('https://instagram.com');
  
   await page.waitForSelector('.sqdOP')
   await page.click('.sqdOP');
  
   await page.waitForSelector('#loginForm div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum div:nth-child(3) div label input')
   await page.type('#loginForm div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum div:nth-child(3) div label input', 'raycahyana_')
  
   await page.waitForSelector('#loginForm div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum div:nth-child(4) div label input')
   await page.type('#loginForm div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum div:nth-child(4) div label input', 'Clarasitaputri')
  
   await page.keyboard.press('Enter', {delay: 10 })
  
    await page.waitFor(7000);
   await page.goto('https://instagram.com');


  //  await page.waitForSelector('.aOOlW.HoLwm')
  //  await page.click('.aOOlW.HoLwm');
  
   
   await page.waitFor(10000);

  
   const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('div[data-testid=new-post-button]')
   ]);
  
   await fileChooser.accept([''+global.filepath+'']);
  
   await page.waitForSelector('.UP43G')
   await page.click('.UP43G');
  
   await page.waitFor(3000);
   await page.click('._472V_')
   await page.type('._472V_', ''+isiCapt+'')
   await page.waitForSelector('.UP43G')
   await page.click('.UP43G');
  
  console.log('YOUR PHOTO WAS POSTED ')

  // await browser.close();
  
  });
}