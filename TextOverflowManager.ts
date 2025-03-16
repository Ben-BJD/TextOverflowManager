class TextOverflowManager 
{
    private domElement: HTMLElement|null;
    private minFontSize: number;
  
    public constructor(domElement: HTMLElement|null,minFontSize: number) 
    {
        this.domElement = domElement;
        this.minFontSize = Math.round(minFontSize);
        
        if(this.minFontSize <= 0)
        {
            this.minFontSize = 1;
        }    
    }
  
    public isOverflowText(): boolean 
    {
        if(this.domElement != null)
        {
            return this.domElement.scrollWidth > this.domElement.clientWidth || this.domElement.scrollHeight > this.domElement.clientHeight;
        }   

        return false;
    }

    private getFontStyle(): string
    {
        const strCssRule = "font-size";
        let strValue = "";
        if(this.domElement != null)
        {
            if(document.defaultView && document.defaultView.getComputedStyle)
            {
                strValue = document.defaultView.getComputedStyle(this.domElement, "").getPropertyValue(strCssRule);
            }
        }
        
        return strValue;
    }

    private reduceFontSize(): boolean 
    {
        if(this.domElement == null)
        {
            return false;
        }

        try
        {
            const fontSizeStyleProp = this.getFontStyle();
            let fontSize = parseFloat(fontSizeStyleProp);
                    
            if( !isNaN(fontSize) && fontSize > this.minFontSize )
            {
                const fontSizeUnit = fontSizeStyleProp.substring( String(fontSize).length, fontSizeStyleProp.length);
                fontSize--;
                this.domElement.style.fontSize = fontSize+fontSizeUnit;
            }
            else
                return false;
        }
        catch(e) {return false;}
        
        return true;
    }

    public correctOverflow(): void 
    {
        if(this.domElement == null)
        {
            return;
        }

        let i:number = 0, busy:boolean = false;
        const limit:number = 10000000;
        
        const interval = setInterval(() => {

            if(this.domElement == null)
            {
                clearInterval(interval);
                return;
            }

            if(!busy) {
                busy = true;
                
                if(++i == limit) {
                    clearInterval(interval);
                }
                
                if(this.isOverflowText()) {
                    if(!this.reduceFontSize())
                        clearInterval(interval);
                } else {
                    clearInterval(interval);
                    //forces android chrome to redraw the element
                    const currDisplay = this.domElement.style.display;
                    this.domElement.style.display='none';
                    this.domElement.offsetHeight; // no need to store this anywhere, the reference is enough
                    this.domElement.style.display=currDisplay;
                }
                
                busy = false;
            }
            
        }, 1); 
    }
}
