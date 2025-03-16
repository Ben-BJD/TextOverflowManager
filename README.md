# TextOverflowManager
Dynamic Text Copy Fitting

Usage:

```
    //select a html element
    const htmlelement:HTMLElement|null = document.getElementById("textCopy");
    //initialise the Text Overflow Manager setting 10px as the minimum reduced font size
    const tom:TextOverflowManager = new TextOverflowManager(htmlelement,10);
    //Copy fit the text
    tom.correctOverflow();

```
