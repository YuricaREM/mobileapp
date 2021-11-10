"use strict";
window.addEventListener("DOMContentLoaded",
function() {
    if(typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storge機能が実装されていません");
        return;
    } else{
        viewStorage();
        saveLocalStorage();
        selectTable();
        allClearLocalStoraeg();
    }
  },false
);
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
        e.preventDefault();
        selectRadioBtn();
        delLocalStorage();
        },false
    );
};
function selectRadioBtn(){
    let w_sel="0";
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");
    
    for(let i=0;　i < radio1.length; i++){
        if(radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
           return w_sel = "1";
          }
        }
        window.alert("一つ選択してください");
    };
function  saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
     function(e){
         e.preventDefault();
         const key = document.getElementById("textKey").value;
         const value = document.getElementById("textMemo").value;
        

         if(key== "" || value=="") {
             window.alert("Key Memoはいずれも必須です");
             return;
         } else {
             localStorage.setItem(key,value);
             viewStorage();
             let w_msg ="LocalStorageに" + key + " "+ value + "保存しました";
             window.alert(w_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
         }
       },false
    );
};

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e) {
        e.preventDefault();
        let w_sel = "0";
        w_sel = selectRadioBtn();

        if(w_sel === "1"){
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            localStorage.removeItem(key);
            viewStorage();
            let w_msg = "LocalStorgeに" + key + " " + value + "を削除しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    },false
 );
};


function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);
    for(let i=0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name ='radio1' type = 'radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);     

    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
      });
      $("#table1").trigger("update");
};

function allClearLocalStoraeg(){
  const allClear = document.getElementById("allClear");
  allClear.addEventListener ("click",
  function(e) {
      e.preventDefault();
      let w_confirm = confirm ("LocalStorageのデータを全て削除します。 \nよろしいですか？");
      if (w_confirm === true) {
          localStorage.clear();
          viewStorage();
          let w_msg = "LocalStorageのデータを全て削除しました"
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";

      } 
   },false
 );
};

