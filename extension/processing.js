var getTooltip = function(tooltiptext){
    var abc =  `
    <div class='tooltiptext'>
         <p class='translation' style="text-align: center; color: #000; margin: 0px;">
         <strong>`
    + tooltiptext + `<\/strong> <\/p>
    <div class='add_to_dict'> <p style="font-size: 12px; text-align: center; padding: 5px; margin: 0px;">   Add to my words <strong style="font-size: 15px;"> א <\/strong> <\/p><\/div> 
    <\/div>
    `
    return abc
}


var replace_word = function(input, word, cls, tooltiptext){
    if(cls == "selected_word"){
        console.log('hello');
        results = input.replace(word, "<div class='selected_word tooltip'>" + word + getTooltip(tooltiptext) + "<\/div>");
    }
    if(cls == "specific_word"){
        results = input.replace(word, "<span class='specific_word'>" + word + "<\/span>");
    }
    return results;
}

results = replace_word(document.body.innerHTML, "הוא", "selected_word", "How");

var replaceAllHardwords = function(wordslist){
    wordslist = wordslist['hardwords'];
    result = document.body.innerHTML;
    for(i=0; i<wordslist.length; i++){
        result = replace_word(result, wordslist[i][0], "selected_word", wordslist[i][1]);
    }
    document.body.innerHTML = result;
};


replaceAllHardwords(JSON.parse(text2));

//" + cls + "
