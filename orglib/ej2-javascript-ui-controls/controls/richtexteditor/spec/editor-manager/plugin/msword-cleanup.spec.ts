/**
 * Paste CleanUp spec
 */
import { EditorManager } from '../../../src/editor-manager/index';
import { RichTextEditor } from '../../../src/rich-text-editor/index';
import { renderRTE, setCursorPoint, destroy } from '../../rich-text-editor/render.spec';
import {
  CLS_RTE_PASTE_KEEP_FORMAT, CLS_RTE_PASTE_REMOVE_FORMAT, CLS_RTE_PASTE_OK,
} from '../../../src/rich-text-editor/base/classes';
import { createElement } from '@syncfusion/ej2-base';

describe('MSWord Content Paste testing', () => {
  let editorObj: EditorManager;
  let rteObj: RichTextEditor;
  let keyBoardEvent: any = {
    preventDefault: () => { },
    type: 'keydown',
    stopPropagation: () => { },
    ctrlKey: false,
    shiftKey: false,
    action: null,
    which: 64,
    key: ''
  };

  beforeAll((done: Function) => {
    rteObj = renderRTE({
      pasteCleanupSettings: {
        prompt: true
      },
      value: ''
    });
    done();
  });

  it('MSWord List Conversion Type 1', (done) => {
    /*
      •	One Node-1
      •	Two Node-1
      •	Three Node-1
    */
    let localElem: string = `
    <p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->One Node-1<o:p></o:p></p>
    <p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->Two Node-1<o:p></o:p></p>
    <p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->Three Node-1<o:p></o:p></p>`;
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    (rteObj as any).inputElement.focus();
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-1</p></li><li><p>Two Node-1</p></li><li><p>Three Node-1</p></li></ul>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 2', (done) => {
    /*
    <ol>
      1. One Node-1
      2. Two Node-1
      3. Three Node-1
    </ol>
     */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->One Node-1<o:p></o:p></p>
    
    <p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->Two Node-1<o:p></o:p></p>
    
    <p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>3.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->Three Node-1<o:p></o:p></p>`;
    rteObj.value = '<p>2</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ol level="1" style="list-style: decimal;"><li><p>One Node-1</p></li><li><p>Two Node-1</p></li><li><p>Three Node-1</p></li></ol><p>2</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      (rteObj as any).inputElement.blur();
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 3', (done) => {
    /*
      •	One Node-3
        o	Two Node-3
      •	Three Node-3
      •	Four Node-3
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-3<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level2 lfo1'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-3<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:2.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level4 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-3<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node-3<o:p></o:p></p>`;
    rteObj.value = '<p>3</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-3</p><ul level="2" style="list-style: square;"><li style="list-style: square;"><p>Two Node-3</p><ul><li style="list-style-type: none;"><ul level="4" style="list-style: disc;"><li style="list-style: disc;"><p>Three Node-3</p></li></ul></li></ul></li></ul></li><li><p>Four Node-3</p></li></ul><p>3</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 4', (done) => {
    /*
      1.	One Node-4
        o	Two Node-4
        o	Three Node-4
      2.	Four Node-4
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-4<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level2 lfo1'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-4<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level2 lfo1'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-4<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node-4<o:p></o:p></p>`;
    rteObj.value = '<p>4</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ol level="1" style="list-style: decimal;"><li><p>One Node-4</p><ul level="2" style="list-style: square;"><li style="list-style: square;"><p>Two Node-4</p></li><li><p>Three Node-4</p></li></ul></li><li><p>Four Node-4</p></li></ol><p>4</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 5', (done) => {
    /*
      1.	One Type-5
        a.	Two Type-5
          i.	Three Type-5
        b.	Four Type-5
      2.	Five Type-5
      3.	Six Type-5
        a.	Seven Type-5

      1.	Eight Separate Type-5
      2.	Nine Separate Type-5
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l1 level2 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>a.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.5in;mso-add-space:
auto;text-indent:-1.5in;mso-text-indent-alt:-9.0pt;mso-list:l1 level3 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'><span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>i.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l1 level2 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>b.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Five Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>3.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Six Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='margin-left:1.0in;mso-add-space:auto;
text-indent:-.25in;mso-list:l1 level2 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>a.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Seven Type-5<o:p></o:p></p>
<p class='MsoNormal'><o:p>&nbsp;</o:p></p>
<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo2'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Eight Separate Type-5<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo2'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Nine Separate Type-5<o:p></o:p></p>`;
    rteObj.value = '<p>5</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ol level="1" style="list-style: decimal;"><li><p>One Type-5</p><ol level="2" style="list-style: lower-alpha;"><li style="list-style: lower-alpha;"><p>Two Type-5</p><ol level="3" style="list-style: lower-roman;"><li style="list-style: lower-roman;"><p>Three Type-5</p></li></ol></li><li><p>Four Type-5</p></li></ol></li><li><p>Five Type-5</p></li><li><p>Six Type-5</p><ol level="2" style="list-style: lower-alpha;"><li style="list-style: lower-alpha;"><p>Seven Type-5</p></li></ol></li></ol><p><br></p><ol level="1" style="list-style: decimal;"><li><p>Eight Separate Type-5</p></li><li><p>Nine Separate Type-5</p></li></ol><p>5</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 6', (done) => {
    /*
    1.	One Node-6
      •	Two Node-6
      •	Three Node-6
    2.	Four Node-6
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-6<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:.75in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level1 lfo2'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-6<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:.75in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level1 lfo2'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-6<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node-6<o:p></o:p></p>`;
    rteObj.value = '<p>6</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ol level="1" style="list-style: decimal;"><li><p>One Node-6</p></li></ol><ul level="1"><li><p>Two Node-6</p></li><li><p>Three Node-6</p></li></ul><ol level="1"><li><p>Four Node-6</p></li></ol><p>6</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 7', (done) => {
    /*
      •	One Node-7
      •	Two Node-7
              o	Three Node-7
                  •	Four Node-7
        o	Five Node-7
      •	Six Node-7
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-7<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-7<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:2.5in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level5 lfo1'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-7<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:3.5in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level7 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node-7<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l1 level2 lfo2'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Five Node-7<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Six Node-7<o:p></o:p></p>`;
    rteObj.value = '<p>7</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-7</p></li><li><p>Two Node-7</p><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul level="5" style="list-style: square;"><li style="list-style: square;"><p>Three Node-7</p><ul><li style="list-style-type: none;"><ul level="7" style="list-style: disc;"><li style="list-style: disc;"><p>Four Node-7</p></li></ul></li></ul></li></ul></li></ul></li></ul></li></ul></li><ul level="2" style="list-style: square;"><li><p>Five Node-7</p></li></ul><li><p>Six Node-7</p></li></ul><p>7</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 8', (done) => {
    /*
      •	One Node-8
      •	Two Node-8
            •	Three Node-8
              o	Four Node -8
            •	Five Node-8
      •	Six Node-8
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-8<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-8<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:2.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level4 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-8<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:2.5in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level5 lfo1'><!--[if !supportLists]--><span style='font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Courier New&quot;'><span style='mso-list:Ignore'>o<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node -8<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:2.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level4 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Five Node-8<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Six Node-8<o:p></o:p></p>`;
    rteObj.value = '<p>8</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-8</p></li><li><p>Two Node-8</p><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul level="4" style="list-style: disc;"><li style="list-style: disc;"><p>Three Node-8</p><ul level="5" style="list-style: square;"><li style="list-style: square;"><p>Four Node -8</p></li></ul></li><li><p>Five Node-8</p></li></ul></li></ul></li></ul></li><li><p>Six Node-8</p></li></ul><p>8</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 9', (done) => {
    /*
      1.	One Node-9
          1.	Two Node-9
          2.	Three Node-9
      •	Four Node-9
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l1 level1 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-9<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l1 level2 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-9<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l1 level2 lfo1'><!--[if !supportLists]--><span style='mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span style='mso-list:Ignore'>2.<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-9<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo2'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Four Node-9<o:p></o:p></p>`;
    rteObj.value = '<p>9</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ol level="1" style="list-style: decimal;"><li><p>One Node-9</p><ol level="2" style="list-style: lower-alpha;"><li style="list-style: lower-alpha;"><p>Two Node-9</p></li><li><p>Three Node-9</p></li></ol></li></ol><ul level="1" style="list-style: disc;"><li><p>Four Node-9</p></li></ul><p>9</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 10', (done) => {
    /*
      •	One Node-10
      •	Two Node-10
      •	Three Node-10
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-10<o:p></o:p></p>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-10<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-10<o:p></o:p></p>`;
    rteObj.value = '<p>10</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-10</p></li><li><p>Two Node-10</p></li><li><p>Three Node-10</p></li></ul><p>10</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 11', (done) => {
    /*
      •	One Node-10
      •	Two Node-10
      •	Three Node-10
    */
    let localElem: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->One Node-10<o:p></o:p></p>
<h2></h2>
<p class='MsoListParagraphCxSpMiddle' style='text-indent:-.25in;mso-list:l0 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Two Node-10<o:p></o:p></p>
<p class='MsoListParagraphCxSpLast' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Three Node-10<o:p></o:p></p>`;
    rteObj.value = '<p>11</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>One Node-10</p></li></ul><ul level="1" style="list-style: disc;"><li><p>Two Node-10</p></li><li><p>Three Node-10</p></li></ul><p>11</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord List Conversion Type 12', (done) => {
    /*
      •	One Node-10
      •	Two Node-10
      •	Three Node-10
    */
    let localElem: string = `<ul level="1" style="list-style: disc;"><li>One Node-10</li></ul><h2></h2><ul level="1" style="list-style: disc;"><li>Two Node-10</li><li>Three Node-10</li></ul>`;
    rteObj.value = '<p>12</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li>One Node-10</li></ul><ul level="1" style="list-style: disc;"><li>Two Node-10</li><li>Three Node-10</li></ul><p>12</p>`;
      if (pastedElem !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('EJ2-47569-Pasting list with `outline level` style from the MS Word', (done) => {
    let localElem: string = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">

<head>
<link rel=File-List
href="file:///C:/Users/SYNCFU~1/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml">
<link rel=themeData
href="file:///C:/Users/SYNCFU~1/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx">
<link rel=colorSchemeMapping
href="file:///C:/Users/SYNCFU~1/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml">
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;
	mso-font-charset:2;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:0 268435456 0 0 -2147483648 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-469750017 -1073732485 9 0 511 0;}
@font-face
	{font-family:Verdana;
	panose-1:2 11 6 4 3 5 4 4 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-1610610945 1073750107 16 0 415 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:10.0pt;
	margin-left:0in;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:10.0pt;
	margin-left:.5in;
	mso-add-space:auto;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:.5in;
	mso-add-space:auto;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:.5in;
	mso-add-space:auto;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:10.0pt;
	margin-left:.5in;
	mso-add-space:auto;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoPapDefault
	{mso-style-type:export-only;
	margin-bottom:10.0pt;
	line-height:115%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 @list l0
	{mso-list-id:557325828;
	mso-list-type:hybrid;
	mso-list-template-ids:1633594766 67698689 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
@list l0:level1
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level2
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level3
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level4
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level5
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level6
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level7
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level8
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level9
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:"Table Normal";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:"";
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-para-margin-top:0in;
	mso-para-margin-right:0in;
	mso-para-margin-bottom:10.0pt;
	mso-para-margin-left:0in;
	line-height:115%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
</style>
<![endif]-->
</head>

<body lang=EN-US style='tab-interval:.5in;word-wrap:break-word'>
<!--StartFragment-->

<p class=MsoNormal style='margin-bottom:0in;line-height:normal;vertical-align:
baseline'><b><u><span style='mso-bidi-font-size:9.0pt;font-family:"Verdana",sans-serif;
mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";
color:black;border:none windowtext 1.0pt;mso-border-alt:none windowtext 0in;
padding:0in'>TESTING:</span></u></b><span style='mso-bidi-font-size:9.0pt;
font-family:"Verdana",sans-serif;mso-fareast-font-family:"Times New Roman";
mso-bidi-font-family:"Times New Roman";color:black'><o:p></o:p></span></p>

<p class=MsoListParagraphCxSpFirst style='margin-bottom:0in;mso-add-space:auto;
text-indent:-.25in;line-height:normal;mso-list:l0 level1 lfo1;vertical-align:
baseline'><![if !supportLists]><span style='mso-bidi-font-size:9.0pt;
font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:Symbol;
color:black'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><![endif]><b><span style='mso-bidi-font-size:7.5pt;
font-family:"Verdana",sans-serif;mso-fareast-font-family:"Times New Roman";
mso-bidi-font-family:"Times New Roman";color:black;border:none windowtext 1.0pt;
mso-border-alt:none windowtext 0in;padding:0in'>Li Node-1</span></b><span
style='mso-bidi-font-size:9.0pt;font-family:"Verdana",sans-serif;mso-fareast-font-family:
"Times New Roman";mso-bidi-font-family:"Times New Roman";color:black'><o:p></o:p></span></p>

<p class=MsoListParagraphCxSpLast style='margin-bottom:0in;mso-add-space:auto;
text-align:justify;text-justify:inter-ideograph;text-indent:-.25in;line-height:
normal;mso-outline-level:1;mso-list:l0 level1 lfo1;background:white'><![if !supportLists]><span
style='mso-bidi-font-size:12.0pt;font-family:Symbol;mso-fareast-font-family:
Symbol;mso-bidi-font-family:Symbol;mso-font-kerning:18.0pt;mso-bidi-font-weight:
bold'><span style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><![endif]><b><span style='mso-bidi-font-size:9.0pt;
font-family:"Verdana",sans-serif;color:black;border:none windowtext 1.0pt;
mso-border-alt:none windowtext 0in;padding:0in'>Li Node-2</span></b><span style='mso-bidi-font-size:
12.0pt;font-family:"Verdana",sans-serif;mso-font-kerning:18.0pt;mso-bidi-font-weight:
bold'><o:p></o:p></span></p>

<p class=MsoNormal style='margin-bottom:0in;line-height:normal;vertical-align:
baseline'><b style='mso-bidi-font-weight:normal'><span style='font-family:"Verdana",sans-serif'>Outline Level Text Node<o:p></o:p></span></b></p>

<!--EndFragment-->
</body>

</html>`;
    rteObj.value = '<p>31</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = 
`<p style="margin-bottom:0in;line-height:normal;vertical-align:
baseline;margin-top:0in;margin-right:0in;margin-left:0in;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><b><u><span style="font-family:&quot;Verdana&quot;,sans-serif;
color:black;border:none windowtext 1.0pt;
padding:0in;">TESTING:</span></u></b></p><ul level="1" style="margin-bottom:0in;"><li style="margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:.5in;line-height:115%;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><p><b><span style="
font-family:&quot;Verdana&quot;,sans-serif;color:black;border:none windowtext 1.0pt;padding:0in;">Li Node-1</span></b></p></li><li style="margin-top:0in;margin-right:0in;margin-bottom:10.0pt;margin-left:.5in;line-height:115%;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><p><b><span style="
font-family:&quot;Verdana&quot;,sans-serif;color:black;border:none windowtext 1.0pt;padding:0in;">Li Node-2</span></b></p></li></ul><p style="margin-bottom:0in;line-height:normal;vertical-align:
baseline;margin-top:0in;margin-right:0in;margin-left:0in;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><b><span style="font-family:&quot;Verdana&quot;,sans-serif;">Outline Level Text Node</span></b></p><p>31</p>`
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('MSWord content with list inside table', (done) => {
    let localElem: string = `<html></head>    
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->    
    <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
     style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;
     mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
      <td width=54 valign=top style='width:40.25pt;border:solid windowtext 1.0pt;
      mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'>No.<o:p></o:p></span></b></p>
      </td>
      <td width=186 valign=top style='width:139.5pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'>Present form<o:p></o:p></span></b></p>
      </td>
      <td width=174 valign=top style='width:130.5pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'>Past form<o:p></o:p></span></b></p>
      </td>
      <td width=210 valign=top style='width:157.25pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'>Past participle form<o:p></o:p></span></b></p>
      </td>
     </tr>
     <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>
      <td width=54 valign=top style='width:40.25pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoListParagraph style='margin-bottom:0in;margin-bottom:.0001pt;
      mso-add-space:auto;text-indent:-.25in;line-height:normal;mso-list:l0 level1 lfo1'><![if !supportLists]><span
      style='font-size:14.0pt;mso-bidi-font-family:Calibri;mso-bidi-theme-font:
      minor-latin'><span style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span style='font-size:14.0pt'><o:p>&nbsp;</o:p></span></p>
      </td>
      <td width=186 valign=top style='width:139.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><span style='font-size:14.0pt'>Bring<o:p></o:p></span></p>
      </td>
      <td width=174 valign=top style='width:130.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'><o:p>&nbsp;</o:p></span></b></p>
      </td>
      <td width=210 valign=top style='width:157.25pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal'><b><span style='font-size:14.0pt'><o:p>&nbsp;</o:p></span></b></p>
      </td></tr></table><!--EndFragment--></body></html>`;
    rteObj.value = '<p>13</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<table border="1" cellspacing="0" cellpadding="0" style="border:none;" class="e-rte-table"><tbody><tr><td width="54" valign="top" style="width:40.25pt;border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">No.</span></b></p></td><td width="186" valign="top" style="width: 139.5pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">Present form</span></b></p></td><td width="174" valign="top" style="width: 130.5pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">Past form</span></b></p></td><td width="210" valign="top" style="width: 157.25pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">Past participle form</span></b></p></td></tr><tr><td width="54" valign="top" style="width: 40.25pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><ol level="1" style="list-style: decimal;"><li><p><span style="font-size:14.0pt;">&nbsp;</span></p></li></ol></td><td width="186" valign="top" style="width: 139.5pt; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><span style="font-size:14.0pt;">Bring</span></p></td><td width="174" valign="top" style="width: 130.5pt; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">&nbsp;</span></b></p></td><td width="210" valign="top" style="width: 157.25pt; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
      normal;"><b><span style="font-size:14.0pt;">&nbsp;</span></b></p></td></tr></tbody></table><p>13</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Pasting list from outlook testing', (done) => {
    let localElem: string = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;
	mso-font-charset:2;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:0 268435456 0 0 -2147483648 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536858881 -1073732485 9 0 511 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:.5in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
span.EmailStyle15
	{mso-style-type:personal;
	mso-style-noshow:yes;
	mso-style-unhide:no;
	mso-ansi-font-size:11.0pt;
	mso-bidi-font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;
	color:windowtext;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 @list l0
	{mso-list-id:1146896413;
	mso-list-type:hybrid;
	mso-list-template-ids:-1355781350 67698689 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
@list l0:level1
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level2
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level3
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level4
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level5
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level6
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level7
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level8
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level9
	{mso-level-number-format:bullet;
	mso-level-text:;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:"Table Normal";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:"";
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-para-margin:0in;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
</style>
<![endif]-->
</head>
<body lang=EN-US style='tab-interval:.5in'>
<!--StartFragment-->
<p class=MsoNormal>List Sample Content<o:p></o:p></p>
<p class=MsoNormal><o:p>&nbsp;</o:p></p>
<ul style='margin-top:0in' type=disc><li class=MsoListParagraph style='margin-left:0in;mso-list:l0 level1 lfo1'>List1<o:p></o:p></li><li class=MsoListParagraph style='margin-left:0in;mso-list:l0 level1 lfo1'>List2<o:p></o:p></li><li class=MsoListParagraph style='margin-left:0in;mso-list:l0 level1 lfo1'>List3<o:p></o:p></li></ul>
<!--EndFragment--></body></html>`;
    rteObj.value = '<p>14</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = false;
      let expectedElem: string = `<p style="margin:0in;margin-bottom:.0001pt;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;">List Sample Content</p><p><br></p><ul type="disc" style="margin-top:0in;margin-bottom:0in;"><li style="margin-left:0in;margin-top:0in;margin-right:0in;margin-bottom:0in;margin-bottom:.0001pt;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;">List1</li><li style="margin-left:0in;margin-top:0in;margin-right:0in;margin-bottom:0in;margin-bottom:.0001pt;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;">List2</li><li style="margin-left:0in;margin-top:0in;margin-right:0in;margin-bottom:0in;margin-bottom:.0001pt;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;">List3</li></ul><p>14</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') === expectedElem) {
        expected = true;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Paste content from Excel along with Col group', (done) => {
    let localElem: string = `<html xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">    
    <head>
    <style>
    <!--table
      {mso-displayed-decimal-separator:"\.";
      mso-displayed-thousand-separator:"\,";}
    @page
      {margin:.75in .7in .75in .7in;
      mso-header-margin:.3in;
      mso-footer-margin:.3in;}
    tr
      {mso-height-source:auto;}
    col
      {mso-width-source:auto;}
    br
      {mso-data-placement:same-cell;}
    td
      {padding-top:1px;
      padding-right:1px;
      padding-left:1px;
      mso-ignore:padding;
      color:black;
      font-size:11.0pt;
      font-weight:400;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;
      mso-number-format:General;
      text-align:general;
      vertical-align:bottom;
      border:none;
      mso-background-source:auto;
      mso-pattern:auto;
      mso-protection:locked visible;
      white-space:nowrap;
      mso-rotate:0;}
    .xl65
      {border-top:.5pt solid black;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid black;
      border-left:.5pt solid black;
      background:#D9D9D9;
      mso-pattern:#D9D9D9 none;}
    .xl66
      {border:.5pt solid black;
      background:#D9D9D9;
      mso-pattern:#D9D9D9 none;}
    .xl67
      {mso-number-format:0;
      border:.5pt solid black;
      background:#D9D9D9;
      mso-pattern:#D9D9D9 none;}
    .xl68
      {border-top:.5pt solid black;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid black;
      border-left:.5pt solid black;}
    .xl69
      {border:.5pt solid black;}
    .xl70
      {mso-number-format:0;
      border:.5pt solid black;}
    -->
    </style>
    </head> 
    <body link="#0563C1" vlink="#954F72">
    <table border=0 cellpadding=0 cellspacing=0 width=425 style='border-collapse:
     collapse;width:319pt'>
    <!--StartFragment-->
     <col width=233 style='mso-width-source:userset;mso-width-alt:8145;width:175pt'>
     <col width=64 span=3 style='width:48pt'>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl65 width=233 style='height:14.5pt;width:175pt'>Hauptansicht
      mit Panelverwaltung</td>
      <td class=xl66 align=right width=64 style='width:48pt'>10</td>
      <td class=xl66 align=right width=64 style='border-left:none;width:48pt'>84</td>
      <td class=xl67 align=right width=64 style='border-left:none;width:48pt'>0</td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl68 style='height:14.5pt;border-top:none'>Bericht</td>
      <td class=xl69 align=right style='border-top:none'>20</td>
      <td class=xl69 align=right style='border-top:none;border-left:none'>168</td>
      <td class=xl70 align=right style='border-top:none;border-left:none'>0</td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl65 style='height:14.5pt;border-top:none'>Filterauswahl</td>
      <td class=xl66 align=right style='border-top:none'>5</td>
      <td class=xl66 align=right style='border-top:none;border-left:none'>42</td>
      <td class=xl67 align=right style='border-top:none;border-left:none'>0</td>
     </tr>
    <!--EndFragment--></table></body></html>`;
    rteObj.value = '<p>15</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let cleanFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_REMOVE_FORMAT);
        cleanFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = false;
      let expectedElem: string = `<table cellpadding="0" cellspacing="0" width="425" class="e-rte-table-border e-rte-table"><tbody><tr height="19"><td height="19" width="233">Hauptansicht
      mit Panelverwaltung</td><td align="right" width="64">10</td><td align="right" width="64">84</td><td align="right" width="64">0</td></tr><tr height="19"><td height="19">Bericht</td><td align="right">20</td><td align="right">168</td><td align="right">0</td></tr><tr height="19"><td height="19">Filterauswahl</td><td align="right">5</td><td align="right">42</td><td align="right">0</td></tr></tbody></table><p>15</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') === expectedElem) {
        expected = true;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Paste table from Excel', (done) => {
    let localElem: string = `<html xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
    
    <head>
    <meta http-equiv=Content-Type content="text/html; charset=utf-8">
    <meta name=ProgId content=Excel.Sheet>
    <meta name=Generator content="Microsoft Excel 15">
    <link id=Main-File rel=Main-File
    href="file:///C:/Users/REVANT~1/AppData/Local/Temp/msohtmlclip1/01/clip.htm">
    <link rel=File-List
    href="file:///C:/Users/REVANT~1/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml">
    <style>
    <!--table
      {mso-displayed-decimal-separator:"\.";
      mso-displayed-thousand-separator:"\,";}
    @page
      {margin:.75in .7in .75in .7in;
      mso-header-margin:.3in;
      mso-footer-margin:.3in;}
    tr
      {mso-height-source:auto;}
    col
      {mso-width-source:auto;}
    br
      {mso-data-placement:same-cell;}
    td
      {padding-top:1px;
      padding-right:1px;
      padding-left:1px;
      mso-ignore:padding;
      color:black;
      font-size:11.0pt;
      font-weight:400;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;
      mso-number-format:General;
      text-align:general;
      vertical-align:bottom;
      border:none;
      mso-background-source:auto;
      mso-pattern:auto;
      mso-protection:locked visible;
      white-space:nowrap;
      mso-rotate:0;}
    -->
    </style>
    </head>
    
    <body link="#0563C1" vlink="#954F72">
    
    <table border=0 cellpadding=0 cellspacing=0 width=192 style='border-collapse:
     collapse;width:144pt'>
    <!--StartFragment-->
     <col width=64 span=3 style='width:48pt'>
     <tr height=19 style='height:14.5pt'>
      <td height=19 width=64 style='height:14.5pt;width:48pt'>cell A1</td>
      <td width=64 style='width:48pt'>cell B1</td>
      <td width=64 style='width:48pt'>cell C1</td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 style='height:14.5pt'>cell A2</td>
      <td></td>
      <td>cell C2</td>
     </tr>
    <!--EndFragment-->
    </table>
    
    </body>
    
    </html>`;
    rteObj.value = '<p>table</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let cleanFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_REMOVE_FORMAT);
        cleanFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: string = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = false;
      let expectedElem: string = `<table cellpadding="0" cellspacing="0" width="192" class="e-rte-table"><tbody><tr height="19"><td height="19" width="64">cell A1</td><td width="64">cell B1</td><td width="64">cell C1</td></tr><tr height="19"><td height="19">cell A2</td><td></td><td>cell C2</td></tr></tbody></table><p>table</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') === expectedElem) {
        expected = true;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('EJ2-26590 - Pasting Content from word does prompt the paste dialog', (done) => {
    let localElem: string = `<p class='MsoListParagraph' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='mso-ascii-font-family:Calibri;mso-fareast-font-family:Calibri;
mso-hansi-font-family:Calibri;mso-bidi-font-family:Calibri'><span style='mso-list:Ignore'>-<span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]-->Para 1 <o:p></o:p></p>
<p class='MsoNormal'><o:p>&nbsp;</o:p></p>
<h1>Head 1 <o:p></o:p></h1>
<p class='MsoListParagraph' style='margin-left:1.25in;mso-add-space:auto'><o:p>&nbsp;</o:p></p>
<table class='MsoTableGrid' border='1' cellspacing='0' cellpadding='0' style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tbody><tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
  <td width='312' valign='top' style='width:233.75pt;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class='MsoNormal' style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:1.0in;margin-bottom:.0001pt;line-height:normal'>T-1<o:p></o:p></p>
  </td>
  <td width='312' valign='top' style='width:233.75pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class='MsoNormal' style='margin-bottom:0in;margin-bottom:.0001pt;line-height:normal'>T-2<o:p></o:p></p>
  </td>
  <td width='312' valign='top' style='width:233.75pt;border:solid windowtext 1.0pt; border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class='MsoNormal' style='margin-bottom:0in;margin-bottom:.0001pt;line-height:normal'>T-3 <o:p></o:p></p>
  </td></tr></tbody></table>`;
    rteObj.value = '<p>16</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1" style="list-style: disc;"><li><p>Para 1 </p></li></ul><p><br></p><h1>Head 1 </h1><p><br></p><table border="1" cellspacing="0" cellpadding="0" style="border:none;" class="e-rte-table"><tbody><tr><td width="312" valign="top" style="width:233.75pt;border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;"><p style="margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:1.0in;margin-bottom:.0001pt;line-height:normal;">T-1</p></td><td width="312" valign="top" style="width: 233.75pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:normal;">T-2</p></td><td width="312" valign="top" style="width: 233.75pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; padding: 0in 5.4pt;"><p style="margin-bottom:0in;margin-bottom:.0001pt;line-height:normal;">T-3 </p></td></tr></tbody></table><p>16</p>`
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Paste from Word feature', (done) => {
    let localElem: string = `<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:'Cambria Math';
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536858881 -1073732485 9 0 511 0;}
@font-face
	{font-family:'Calibri Light';
	panose-1:2 15 3 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536859905 -1073732485 9 0 511 0;}
@font-face
	{font-family:Algerian;
	panose-1:4 2 7 5 4 10 2 6 7 2;
	mso-font-charset:0;
	mso-generic-font-family:decorative;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:'';
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:'Calibri',sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:'Times New Roman';
	mso-bidi-theme-font:minor-bidi;}
h1
	{mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-link:'Heading 1 Char';
	mso-style-next:Normal;
	margin-top:12.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:1;
	font-size:16.0pt;
	font-family:'Calibri Light',sans-serif;
	mso-ascii-font-family:'Calibri Light';
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:'Calibri Light';
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:'Times New Roman';
	mso-bidi-theme-font:major-bidi;
	color:#2F5496;
	mso-themecolor:accent1;
	mso-themeshade:191;
	mso-font-kerning:0pt;
	font-weight:normal;}
span.Heading1Char
	{mso-style-name:'Heading 1 Char';
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:'Heading 1';
	mso-ansi-font-size:16.0pt;
	mso-bidi-font-size:16.0pt;
	font-family:'Calibri Light',sans-serif;
	mso-ascii-font-family:'Calibri Light';
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:'Calibri Light';
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:'Times New Roman';
	mso-bidi-theme-font:major-bidi;
	color:#2F5496;
	mso-themecolor:accent1;
	mso-themeshade:191;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:'Calibri',sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:'Times New Roman';
	mso-bidi-theme-font:minor-bidi;}
.MsoPapDefault
	{mso-style-type:export-only;
	margin-bottom:8.0pt;
	line-height:107%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:'Table Normal';
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:'';
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-para-margin-top:0in;
	mso-para-margin-right:0in;
	mso-para-margin-bottom:8.0pt;
	mso-para-margin-left:0in;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:'Calibri',sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:'Times New Roman';
	mso-bidi-theme-font:minor-bidi;}
</style>
<![endif]-->
<!--StartFragment-->
<h1>Heading 1<o:p></o:p></h1>
<p class='MsoNormal'>Normal Text content <span style='color:red'>red color </span><span style='color:yellow'>yellow color </span><span style='font-size:23.0pt;
line-height:107%'>font size 23</span> <b style='mso-bidi-font-weight:normal'>bold
text</b> <i style='mso-bidi-font-style:normal'>italic text</i> <span style='font-family:Algerian'>font family text</span> <o:p></o:p></p><!--EndFragment-->`;
    rteObj.value = '<p>17</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<h1 style="margin-top:12.0pt;margin-right:0in;margin-bottom:0in;margin-left:0in;margin-bottom:.0001pt;line-height:107%;font-size:16.0pt;font-family:'Calibri Light',sans-serif;color:#2F5496;font-weight:normal;">Heading 1</h1><p style="margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:11.0pt;font-family:'Calibri',sans-serif;">Normal Text content <span style="color:red;">red color </span><span style="color:yellow;">yellow color </span><span style="font-size:23.0pt;
line-height:107%;">font size 23</span><b>bold
text</b><i>italic text</i><span style="font-family:Algerian;">font family text</span></p><p>17</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Tab style not applied issue', (done) => {
    let localElem: string = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
    xmlns:w='urn:schemas-microsoft-com:office:word'
    xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'
    xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
    <style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:'Cambria Math';
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:'';
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:'Table Normal';
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:'';
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    </style>
    <![endif]-->
    </head>
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->
    <p class=MsoNormal>Tab<o:p></o:p></p>
    <p class=MsoNormal style='text-indent:.5in'>Tab 1<o:p></o:p></p>
    <p class=MsoNormal style='margin-left:.5in;text-indent:.5in'>Tab 2<o:p></o:p></p>
    <p class=MsoNormal style='margin-left:1.0in;text-indent:.5in'>Tab 3<o:p></o:p></p>
    <p class=MsoNormal style='margin-left:1.5in;text-indent:.5in'>Tab 4<o:p></o:p></p>
    <!--EndFragment--></body></html>`;
    rteObj.value = '<p>18</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<p>Tab</p><p style="text-indent:.5in;">Tab 1</p><p style="margin-left:.5in;text-indent:.5in;">Tab 2</p><p style="margin-left:1.0in;text-indent:.5in;">Tab 3</p><p style="margin-left:1.5in;text-indent:.5in;">Tab 4</p><p>18</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('One line aligned to right ', (done) => {
    let localElem: string = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
    xmlns:w='urn:schemas-microsoft-com:office:word'
    xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'
    xmlns='http://www.w3.org/TR/REC-html40'>
    <head><style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:'Cambria Math';
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:'';
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:'Table Normal';
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:'';
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    </style>
    <![endif]-->
    </head>
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->
    <p class=MsoNormal>First line to left<o:p></o:p></p>
    <p class=MsoNormal align=right style='text-align:right'>Second line to right<o:p></o:p></p>
    <p class=MsoNormal>Third line to left<o:p></o:p></p>
    <!--EndFragment--></body></html>`;
    rteObj.value = '<p>19</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<p>First line to left</p><p align="right" style="text-align:right;">Second line to right</p><p>Third line to left</p><p>19</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });
  
  it('Only one heading ', (done) => {
    let localElem: string = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
    @font-face
      {font-family:"Calibri Light";
      panose-1:2 15 3 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536859905 -1073732485 9 0 511 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    h2
      {mso-style-priority:9;
      mso-style-qformat:yes;
      mso-style-link:"Heading 2 Char";
      mso-style-next:Normal;
      margin-top:2.0pt;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:0in;
      margin-bottom:.0001pt;
      line-height:107%;
      mso-pagination:widow-orphan lines-together;
      page-break-after:avoid;
      mso-outline-level:2;
      font-size:13.0pt;
      font-family:"Calibri Light",sans-serif;
      mso-ascii-font-family:"Calibri Light";
      mso-ascii-theme-font:major-latin;
      mso-fareast-font-family:"Times New Roman";
      mso-fareast-theme-font:major-fareast;
      mso-hansi-font-family:"Calibri Light";
      mso-hansi-theme-font:major-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:major-bidi;
      color:#2F5496;
      mso-themecolor:accent1;
      mso-themeshade:191;
      font-weight:normal;}
    span.Heading2Char
      {mso-style-name:"Heading 2 Char";
      mso-style-priority:9;
      mso-style-unhide:no;
      mso-style-locked:yes;
      mso-style-link:"Heading 2";
      mso-ansi-font-size:13.0pt;
      mso-bidi-font-size:13.0pt;
      font-family:"Calibri Light",sans-serif;
      mso-ascii-font-family:"Calibri Light";
      mso-ascii-theme-font:major-latin;
      mso-fareast-font-family:"Times New Roman";
      mso-fareast-theme-font:major-fareast;
      mso-hansi-font-family:"Calibri Light";
      mso-hansi-theme-font:major-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:major-bidi;
      color:#2F5496;
      mso-themecolor:accent1;
      mso-themeshade:191;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:"Table Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    </style>
    <![endif]-->
    </head>
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->
    <h2 class=MsoNormal>Heading2<o:p></o:p></h2>
    <!--EndFragment--></body></html>`;
    rteObj.value = '<p>20</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = false;
      let expectedElem: string = `<h2>Heading2</h2><p>20</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') === expectedElem) {
        expected = true;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('List with styles font family, font color, font size', (done) => {
    let localElem: string = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
    xmlns:w='urn:schemas-microsoft-com:office:word'
    xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'
    xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
    <style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:Wingdings;
      panose-1:5 0 0 0 0 0 0 0 0 0;
      mso-font-charset:2;
      mso-generic-font-family:auto;
      mso-font-pitch:variable;
      mso-font-signature:0 268435456 0 0 -2147483648 0;}
    @font-face
      {font-family:'Cambria Math';
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
    @font-face
      {font-family:Algerian;
      panose-1:4 2 7 5 4 10 2 6 7 2;
      mso-font-charset:0;
      mso-generic-font-family:decorative;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:'';
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
     /* List Definitions */
     @list l0
      {mso-list-id:1597908209;
      mso-list-type:hybrid;
      mso-list-template-ids:-871440298 67698689 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
    @list l0:level1
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Symbol;}
    @list l0:level2
      {mso-level-number-format:bullet;
      mso-level-text:o;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:'Courier New';}
    @list l0:level3
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Wingdings;}
    @list l0:level4
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Symbol;}
    @list l0:level5
      {mso-level-number-format:bullet;
      mso-level-text:o;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:'Courier New';}
    @list l0:level6
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Wingdings;}
    @list l0:level7
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Symbol;}
    @list l0:level8
      {mso-level-number-format:bullet;
      mso-level-text:o;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:'Courier New';}
    @list l0:level9
      {mso-level-number-format:bullet;
      mso-level-text:;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;
      font-family:Wingdings;}
    ol
      {margin-bottom:0in;}
    ul
      {margin-bottom:0in;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:'Table Normal';
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:'';
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:'Calibri',sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:'Times New Roman';
      mso-bidi-theme-font:minor-bidi;}
    </style>
    <![endif]-->
    </head>
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->
    <p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt 'Times New Roman''>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><![endif]>List 1 with <span style='font-size:26.0pt;
    line-height:107%'>font size</span><o:p></o:p></p>
    <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt 'Times New Roman''>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><![endif]>List 2 with <span style='color:red'>font color</span><o:p></o:p></p>
    <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol'><span style='mso-list:Ignore'>·<span style='font:7.0pt 'Times New Roman''>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><![endif]>List 3 with <span style='font-family:Algerian'>font
    family</span><o:p></o:p></p>    
    <p class=MsoListParagraphCxSpLast style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:
    Symbol;color:white;mso-style-textoutline-type:solid;mso-style-textoutline-fill-color:
    #ED7D31;mso-style-textoutline-fill-themecolor:accent2;mso-style-textoutline-fill-alpha:
    100.0%;mso-style-textoutline-outlinestyle-dpiwidth:.52pt;mso-style-textoutline-outlinestyle-linecap:
    flat;mso-style-textoutline-outlinestyle-join:round;mso-style-textoutline-outlinestyle-pctmiterlimit:
    0%;mso-style-textoutline-outlinestyle-dash:solid;mso-style-textoutline-outlinestyle-align:
    center;mso-style-textoutline-outlinestyle-compound:simple;mso-effects-shadow-color:
    #ED7D31;mso-effects-shadow-themecolor:accent2;mso-effects-shadow-alpha:100.0%;
    mso-effects-shadow-dpiradius:0pt;mso-effects-shadow-dpidistance:3.0pt;
    mso-effects-shadow-angledirection:2700000;mso-effects-shadow-align:topleft;
    mso-effects-shadow-pctsx:100.0%;mso-effects-shadow-pctsy:100.0%;mso-effects-shadow-anglekx:
    0;mso-effects-shadow-angleky:0'><span style='mso-list:Ignore'>·<span
    style='font:7.0pt 'Times New Roman''>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]>List
    4 with <span style='background:yellow;mso-highlight:yellow'>background color</span><b
    style='mso-bidi-font-weight:normal'><span style='color:white;mso-style-textoutline-type:
    solid;mso-style-textoutline-fill-color:#ED7D31;mso-style-textoutline-fill-themecolor:
    accent2;mso-style-textoutline-fill-alpha:100.0%;mso-style-textoutline-outlinestyle-dpiwidth:
    .52pt;mso-style-textoutline-outlinestyle-linecap:flat;mso-style-textoutline-outlinestyle-join:
    round;mso-style-textoutline-outlinestyle-pctmiterlimit:0%;mso-style-textoutline-outlinestyle-dash:
    solid;mso-style-textoutline-outlinestyle-align:center;mso-style-textoutline-outlinestyle-compound:
    simple;mso-effects-shadow-color:#ED7D31;mso-effects-shadow-themecolor:accent2;
    mso-effects-shadow-alpha:100.0%;mso-effects-shadow-dpiradius:0pt;mso-effects-shadow-dpidistance:
    3.0pt;mso-effects-shadow-angledirection:2700000;mso-effects-shadow-align:topleft;
    mso-effects-shadow-pctsx:100.0%;mso-effects-shadow-pctsy:100.0%;mso-effects-shadow-anglekx:
    0;mso-effects-shadow-angleky:0'><o:p></o:p></span></b></p><!--EndFragment--></body></html>`;
    rteObj.value = '<p>21</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<ul level="1"><li><p>List 1 with <span style="font-size:26.0pt;
    line-height:107%;">font size</span></p></li><li><p>List 2 with <span style="color:red;">font color</span></p></li><li><p>List 3 with <span style="font-family:Algerian;">font
    family</span></p></li><li><p>List
    4 with <span style="background:yellow;">background color</span></p></li></ul><p>21</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('Paste image from MSWord', () => {
    let localElem: string = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Microsoft Word 15">
    <meta name="Originator" content="Microsoft Word 15">
    <link rel="File-List" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml">
    <link rel="Edit-Time-Data" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_editdata.mso">
    <link rel="themeData" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx">
    <link rel="colorSchemeMapping" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml">
    <style>
    <!--
     /* Font Definitions */
     @font-face
        {font-family:"Cambria Math";
        panose-1:2 4 5 3 5 4 6 3 2 4;
        mso-font-charset:0;
        mso-generic-font-family:roman;
        mso-font-pitch:variable;
        mso-font-signature:3 0 0 0 1 0;}
    @font-face
        {font-family:Calibri;
        panose-1:2 15 5 2 2 2 4 3 2 4;
        mso-font-charset:0;
        mso-generic-font-family:swiss;
        mso-font-pitch:variable;
        mso-font-signature:-536858881 -1073732485 9 0 511 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
        {mso-style-unhide:no;
        mso-style-qformat:yes;
        mso-style-parent:"";
        margin:0in;
        margin-bottom:.0001pt;
        mso-pagination:widow-orphan;
        font-size:11.0pt;
        font-family:"Calibri",sans-serif;
        mso-fareast-font-family:Calibri;
        mso-fareast-theme-font:minor-latin;}
    .MsoChpDefault
        {mso-style-type:export-only;
        mso-default-props:yes;
        font-size:10.0pt;
        mso-ansi-font-size:10.0pt;
        mso-bidi-font-size:10.0pt;}
    @page WordSection1
        {size:8.5in 11.0in;
        margin:1.0in 1.0in 1.0in 1.0in;
        mso-header-margin:.5in;
        mso-footer-margin:.5in;
        mso-paper-source:0;}
    div.WordSection1
        {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
        {mso-style-name:"Table Normal";
        mso-tstyle-rowband-size:0;
        mso-tstyle-colband-size:0;
        mso-style-noshow:yes;
        mso-style-priority:99;
        mso-style-parent:"";
        mso-padding-alt:0in 5.4pt 0in 5.4pt;
        mso-para-margin:0in;
        mso-para-margin-bottom:.0001pt;
        mso-pagination:widow-orphan;
        font-size:10.0pt;
        font-family:"Times New Roman",serif;}
    </style>
    <![endif]-->
    <!--StartFragment--><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;
    mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:
    EN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA"><img width="128" height="128" src="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_image001.gif" style="height:1.333in;width:1.333in" border="0" v:shapes="Picture_x0020_1"><!--[endif]--></span><!--EndFragment-->`;
    let localElem1: string = `<p class='MsoListParagraphCxSpFirst' style='text-indent:-.25in;mso-list:l0 level1 lfo1'><!--[if !supportLists]--><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family:Symbol'><span style='mso-list:Ignore'><span style='font:7.0pt &quot;Times New Roman&quot;'>&nbsp;</span></span></span><!--[endif]--><o:p></o:p></p>`;

    let rtfData: string = `{\\rtf1\\adeflang1025\\ansi\\ansicpg1252\\uc1\\adeff37\\deff0\\stshfdbch0\\stshfloch0\\stshfhich0\\stshfbi0\\deflang1033\\deflangfe1033\\themelang1033\\themelangfe0\\themelangcs0{\\fonttbl{\\f0\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\f34\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02040503050406030204}Cambria Math;}
{\\f37\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0502020204030204}Calibri;}{\\flomajor\\f31500\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}
{\\fdbmajor\\f31501\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\fhimajor\\f31502\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0302020204030204}Calibri Light;}
{\\fbimajor\\f31503\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\flominor\\f31504\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}
{\\fdbminor\\f31505\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\fhiminor\\f31506\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0502020204030204}Calibri;}
{\\fbiminor\\f31507\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\f46\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\f47\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}
{\\f49\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\f50\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\f51\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\f52\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}
{\\f53\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\f54\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\f416\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri CE;}{\\f417\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Cyr;}
{\\f419\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Greek;}{\\f420\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Tur;}{\\f421\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri (Hebrew);}{\\f422\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri (Arabic);}
{\\f423\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Baltic;}{\\f424\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri (Vietnamese);}{\\flomajor\\f31508\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}
{\\flomajor\\f31509\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\flomajor\\f31511\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\flomajor\\f31512\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}
{\\flomajor\\f31513\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\flomajor\\f31514\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\flomajor\\f31515\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}
{\\flomajor\\f31516\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\fdbmajor\\f31518\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\fdbmajor\\f31519\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}
{\\fdbmajor\\f31521\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\fdbmajor\\f31522\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\fdbmajor\\f31523\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}
{\\fdbmajor\\f31524\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\fdbmajor\\f31525\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\fdbmajor\\f31526\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}
{\\fhimajor\\f31528\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri Light CE;}{\\fhimajor\\f31529\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Light Cyr;}{\\fhimajor\\f31531\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Light Greek;}
{\\fhimajor\\f31532\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Light Tur;}{\\fhimajor\\f31533\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri Light (Hebrew);}{\\fhimajor\\f31534\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri Light (Arabic);}
{\\fhimajor\\f31535\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Light Baltic;}{\\fhimajor\\f31536\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri Light (Vietnamese);}{\\fbimajor\\f31538\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}
{\\fbimajor\\f31539\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\fbimajor\\f31541\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\fbimajor\\f31542\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}
{\\fbimajor\\f31543\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\fbimajor\\f31544\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\fbimajor\\f31545\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}
{\\fbimajor\\f31546\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\flominor\\f31548\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\flominor\\f31549\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}
{\\flominor\\f31551\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\flominor\\f31552\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\flominor\\f31553\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}
{\\flominor\\f31554\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\flominor\\f31555\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\flominor\\f31556\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}
{\\fdbminor\\f31558\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\fdbminor\\f31559\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\fdbminor\\f31561\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}
{\\fdbminor\\f31562\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\fdbminor\\f31563\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\fdbminor\\f31564\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}
{\\fdbminor\\f31565\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\fdbminor\\f31566\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\fhiminor\\f31568\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri CE;}
{\\fhiminor\\f31569\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Cyr;}{\\fhiminor\\f31571\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Greek;}{\\fhiminor\\f31572\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Tur;}
{\\fhiminor\\f31573\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri (Hebrew);}{\\fhiminor\\f31574\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri (Arabic);}{\\fhiminor\\f31575\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Baltic;}
{\\fhiminor\\f31576\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri (Vietnamese);}{\\fbiminor\\f31578\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\fbiminor\\f31579\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}
{\\fbiminor\\f31581\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\fbiminor\\f31582\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\fbiminor\\f31583\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}
{\\fbiminor\\f31584\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\fbiminor\\f31585\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\fbiminor\\f31586\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}}
{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red0\\green255\\blue255;\\red0\\green255\\blue0;\\red255\\green0\\blue255;\\red255\\green0\\blue0;\\red255\\green255\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue128;\\red0\\green128\\blue128;\\red0\\green128\\blue0;
\\red128\\green0\\blue128;\\red128\\green0\\blue0;\\red128\\green128\\blue0;\\red128\\green128\\blue128;\\red192\\green192\\blue192;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}{\\*\\defchp }{\\*\\defpap 
\\ql \\li0\\ri0\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 }\\noqfpromote {\\stylesheet{\\ql \\li0\\ri0\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 \\rtlch\\fcs1 \\af37\\afs22\\alang1025 \\ltrch\\fcs0 
\\f37\\fs22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 \\snext0 \\sqformat \\spriority0 \\styrsid3551130 Normal;}{\\*\\cs10 \\additive \\ssemihidden \\sunhideused \\spriority1 \\styrsid3551130 Default Paragraph Font;}{\\*
\\ts11\\tsrowd\\trftsWidthB3\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\tblind0\\tblindtype3\\tsvertalt\\tsbrdrt\\tsbrdrl\\tsbrdrb\\tsbrdrr\\tsbrdrdgl\\tsbrdrdgr\\tsbrdrh\\tsbrdrv 
\\ql \\li0\\ri0\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 \\rtlch\\fcs1 \\af0\\afs20\\alang1025 \\ltrch\\fcs0 \\fs20\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 \\snext11 \\ssemihidden \\sunhideused Normal Table;}}{\\*\\pgptbl {\\pgp
\\ipgp0\\itap0\\li0\\ri0\\sb0\\sa0}}{\\*\\rsidtbl \\rsid2709252\\rsid3551130}{\\mmathPr\\mmathFont34\\mbrkBin0\\mbrkBinSub0\\msmallFrac0\\mdispDef1\\mlMargin0\\mrMargin0\\mdefJc1\\mwrapIndent1440\\mintLim0\\mnaryLim1}{\\*\\xmlnstbl {\\xmlns1 http://schemas.microsoft.com/office/wo
rd/2003/wordml}}\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1440\\margb1440\\gutter0\\ltrsect 
\\widowctrl\\ftnbj\\aenddoc\\trackmoves0\\trackformatting1\\donotembedsysfont1\\relyonvml0\\donotembedlingdata0\\grfdocevents0\\validatexml1\\showplaceholdtext0\\ignoremixedcontent0\\saveinvalidxml0\\showxmlerrors1\\noxlattoyen
\\expshrtn\\noultrlspc\\dntblnsbdb\\nospaceforul\\formshade\\horzdoc\\dgmargin\\dghspace180\\dgvspace180\\dghorigin100\\dgvorigin0\\dghshow1\\dgvshow1
\\jexpand\\pgbrdrhead\\pgbrdrfoot\\splytwnine\\ftnlytwnine\\htmautsp\\nolnhtadjtbl\\useltbaln\\alntblind\\lytcalctblwd\\lyttblrtgr\\lnbrkrule\\nobrkwrptbl\\snaptogridincell\\allowfieldendsel\\wrppunct\\asianbrkrule\\rsidroot3551130
\\newtblstyruls\\nogrowautofit\\usenormstyforlist\\noindnmbrts\\felnbrelev\\nocxsptable\\indrlsweleven\\noafcnsttbl\\afelev\\utinl\\hwelev\\spltpgpar\\notcvasp\\notbrkcnstfrctbl\\notvatxbx\\krnprsnet\\cachedcolbal \\nouicompat \\fet0{\\*\\wgrffmtfilter 2450}
\\nofeaturethrottle1\\ilfomacatclnup0\\ltrpar \\sectd \\ltrsect\\linex0\\endnhere\\sectdefaultcl\\sftnbj {\\*\\pnseclvl1\\pnucrm\\pnstart1\\pnindent720\\pnhang {\\pntxta .}}{\\*\\pnseclvl2\\pnucltr\\pnstart1\\pnindent720\\pnhang {\\pntxta .}}{\\*\\pnseclvl3
\\pndec\\pnstart1\\pnindent720\\pnhang {\\pntxta .}}{\\*\\pnseclvl4\\pnlcltr\\pnstart1\\pnindent720\\pnhang {\\pntxta )}}{\\*\\pnseclvl5\\pndec\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl6\\pnlcltr\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}
{\\*\\pnseclvl7\\pnlcrm\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl8\\pnlcltr\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl9\\pnlcrm\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}\\pard\\plain \\ltrpar
\\ql \\li0\\ri0\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid3551130 \\rtlch\\fcs1 \\af37\\afs22\\alang1025 \\ltrch\\fcs0 \\f37\\fs22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\field\\fldedit{\\*\\fldinst {\\rtlch\\fcs1 \\af37 
\\ltrch\\fcs0 \\insrsid3551130  INCLUDEPICTURE "cid:image001.png@01D56274.7F955880" \\\\* MERGEFORMATINET }}{\\fldrslt {\\rtlch\\fcs1 \\af37 \\ltrch\\fcs0 \\insrsid3551130 {\\*\\shppict{\\pict{\\*\\picprop\\shplid1025{\\sp{\\sn shapeType}{\\sv 75}}{\\sp{\\sn fFlipH}{\\sv 0}}
{\\sp{\\sn fFlipV}{\\sv 0}}{\\sp{\\sn pibName}{\\sv cid:image001.png@01D56274.7F955880}}{\\sp{\\sn pibFlags}{\\sv 74}}{\\sp{\\sn fLine}{\\sv 0}}{\\sp{\\sn wzName}{\\sv Picture 1}}{\\sp{\\sn fLayoutInCell}{\\sv 1}}}
\\picscalex150\\picscaley150\\piccropl0\\piccropr0\\piccropt0\\piccropb0\\picw2258\\pich2258\\picwgoal1280\\pichgoal1280\\pngblip\\bliptag897655604{\\*\\blipuid 3581233405128f118ef6f8b80321bbf2}
89504e470d0a1a0a0000000d4948445200000080000000800801000000f4e091f90000006c504c5445ffffff030303353535cececefcfcfc0b0b0bededed8888
88f9f9f93e3e3ee1e1e14c4c4c1d1d1d232323f3f3f3171717797979292929c3c3c36a6a6a5e5e5e949494585858b4b4b4a6a6a6c9c9c9323232464646111111
646464bababa7c7c7cd8d8d8aaaaaa8e8e8e9d9d9d2a07e710000003d949444154789ced5adbb6aa100c6cbc00a27847515151ffff1f775a6029d0a32904fa70
3a2fdbbd16d0c0b4d3641a211c1c1c1c1c1c1c1cba616b3b80fdc4eef81e1ced0690c0d56e007348ad72104c016e36034800606733803d06b0b2c8816400c0a2
141c01a656394006e6000b6b1c4c5280c42607371cdc9b59e460870c881820b234fe6405108bd01e075bc98010c8c1da4e00c8c00cff3cad7110490684e2e064
63fc130e1cca1f234b1cac730684f02d71800cf8ea87e4603cfcf8e3920121ce5638b8039c8b9fc8c166f800ce2503426436389083661fc1dc870ea0f2d9fd37
1d83a1b2f82d70505b7a1f136220d43680fbe01cd4b6c0ca941c028d2460331007713d155d0fccc1a59e087e08f310f0a05112468372f06a1664c8c168b800b0
1aa9db02a72139f0b01e6b1823c8c193e1d94b59ef12b00aea772207e98880d9affc3199b61a5f786b52e4e7ece747c8466dc62746b0d6dd5947b0265f5a8d60
fc0db85fc1826ae7dcb0e88211e7a48e25b1738f7cbd875207e9836b780fd72d4c63a37b7c19f27ec932fe6d81cfda98662ca7a8cd5d1a047739a576c6534a2c
0ff2bb751617b5a8d276866e623873b4cf48f11997b6f359454f5e3b1ae45fb1c336d956120ae4f3a85bedde4112263e70aca4d69210ceb8b44449c2d5f4451e
72f6cd78d4b485242caff2f3dfb93cd47c321b48e918d3748838ddbb9791243ce5d5071e1d2f91d1b753356da72fd6e111c18e188117d1121f731c579408d4f8
ada5eb3bc20bc18d8aba89f777f8b400faab0f289e2806c09649d54172855132f67d05403a9b487009f63305952df2fb7426d0d56d3c904539415de7bd7110d3
4e499183b41f0ee6b4f3316dedcc018d2da2475f1c24d4736ac9411f87a9e417939faa070e963a6a97d7c3a1b9ef6b1c1c06e826b74a7c9a99cfab170e3412eb
97668a5f1d8e3c5d4d2005aebac98479e2a3cb7e1b3e26038e75893faa8a252bf2ff55657a1025cb08b257e1e35f95a01589cfa4517f1345db0481ec5578ff9b
6d2a09e276514b03f99b0a2403efa4bce1f8e41ecc3b116eb8e99db1fb6040ebf8c4955280bda940768b94ef973b3e59fd92bc182a13266e0e8a5e05513a063a
c72750e5606146703776ecca9372e599acfea1f48fb71dc3cd41d1ab205edf1d9f0f49e06dec900c8414c7e72d09bc8d1d79afc2966213dc0a49e06dec900742
f9cbfd364ad4224d5fac8d1dea488ceef8e492c0d9d8210f054d1c9f5c1280ef40fbacddf5bf40394453360ec6a0cd7bbee2a17215a6c60ee5379a3a3ea13af8
e1e1e0dccaf1519acdd2d811e6898f395012580eb4fdd68e0f4a020707870e09ee93e13075d2e9c0a2db6987838383838383c3ff813f76bb29ecdb4237f40000000049454e44ae426082}}{\\nonshppict{\\pict\\picscalex100\\picscaley100\\piccropl0\\piccropr0\\piccropt0\\piccropb0
\\picw3387\\pich3387\\picwgoal1920\\pichgoal1920\\wmetafile8\\bliptag897655604{\\*\\blipuid 3581233405128f118ef6f8b80321bbf2}0100090000034a22000000002122000000000400000003010800050000000b0200000000050000000c0281008100010000001e00040000000701040004000000
0701040021220000410b2000cc008000800000000000800080000000000028000000800000008000000001000800000000000000000000000000000000000000
00000000000000000000ffffff00c3c3c1005e5e5e00fcfcfc00ededed0003030100b4b4b400a6a6a600646464004c4c4c0011111100f9f9f9000b0b0b00baba
ba006a6a6a00171717001d1d1d003e3e3e009494940023232100e1e1e100797979008e8e8e00c9c9c9003535350088888800cecece00323232007c7c7c002929
2900d8d8d800464646009d9d9d00f3f3f100aaaaaa00585858000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010405010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010105010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101240e0101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101011717010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101011a06160c010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101050a061b010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101150606191f0101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010e11061c01010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101011c06060d2101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010c160606061d01010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101011a0606060624220101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101011519060606061b01010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101011b0606060606140201010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101230d060606061e0101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101011c0606060606061a040101010101010101010101010101
010101010101010101010101010101010101010101010101010122090606060d0606160101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101011606061c0b060606121501010101010101010101010101
010101010101010101010101010101010101010101010101011b1e060606140606061b0101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101011b06060615120606060b23010101010101010101010101
010101010101010101010101010101010101010101010101130d060606241a060614010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101011406061a041d06060606092201010101010101010101
01010101010101010101010101010101010101010101050a0606060b210119060616010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010116060612010102140606061e1b010101010101010101
0101010101010101010101010101010101010101010e110606061c1f011506060618010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010206060615010122240606060d1a0101010101010101
01010101010101010101010101010101010101041d060606060f0c01011706061401010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101011406061301010101210b0606062015010101010101
01010101010101010101010101010101010115120606061007010101011206061601010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010f06061201010101011f1906060610070101010101
0101010101010101010101010101010101230b060606201501010101150606060201010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101020606060501010101010c16060606060f0c010101
0101010101010101010101010101010c09060606061a010101010101130606140101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101040b060621010101010101010e110606061e1f0101
01010101010101010101010101011b1e0606061418010101010101011206060f0101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010f06060a0101010101010101050a0606060d1301
01010101010101010101010101130d06060624220101010101010115060606020101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010706060d05010101010101010101130d0606060a
0501010101010101010101050a0606060d2101010101010101010113060611040101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010c0b060608010101010101010101011f1e060606
110e010101010101010102110606061c1f010101010101010101011206060f010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010306060a01010101010101010101010c0f0606
0606160c01010101041d060606060f0c010101010101010101010506060602010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010706060d0c0101010101010101010101010710
060606191f0101151206060610070101010101010101010101011306061004010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010c0d0606230101010101010101010101010115
200606060d21230b0606061215010101010101010101010101012006060f01010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101240606030101010101010101010101010101
011a0d060606060606061a0401010101010101010101010101050606060e01010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010806060b0c01010101010101010101010101
01011b1e0606060614020101010101010101010101010101012106060b0401010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101220d06060701010101010101010101010101
010101220924242422010101010101010101010101010101010a0606090101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010a06060301010101010101010101010101
01010101010101010101010101010101010101010101010105060606070101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010806061004010101010101010101010101
0101010101010101010101010101010101010101010101010806060b040101010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101050606060e010101010101010101010101
0101010101010101010101010101010101010101010101010a060603010101010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010a06060f010101010101010101010101
0101010101010101010101010101010101010101010101050d060607010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010113060610040101010101010101010101
01010101010101010101010101010101010101010101010806060b0c010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010105060606020101010101010101010101
01010101010101010101010101010101010101010101010a06060301010101010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011206060f0101010101010101010101
010101010101010101010101010101010101010101010c0d06060701010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101130606140101010101010101010101
010101010101010101010101010101010101010101010806060d0c01010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101150606061801010101010101010101
01010101010101010101010101010101010101010101240606030101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011906061601010101010101010101
01010101010101010101010101010101010101010101140606230101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011a06061601010101010101010101
01010101010101010101010101010101010101010101140606150101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101152006061601010101010101010101
01010101010101010101010101010101010101010101140606110e01010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010107100606110e01010101010101010101
010101010101010101010101010101010101010101010514060606160c0101010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010c0f060606110e0101010101010101010101
010101010101010101010101010101010101010101010105140606061c1f01010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011f1c060606110e010101010101010101010101
01010101010101010101010101010101010101010101010105200606060d21010101010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101210d0606060a0501010101010101010101010101
0101010101010101010101010101010101010101010101010101170d060606242201010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010122240606060d13010101010101010101010101010101
0101010101010101010101010101010101010101010101010101011b1e0606061402010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010118140606061e1b01010101010101010101010101010101
010101010101010101010101010101010101010101010101010101012209060606061d0401010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101011a0d06060609220101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101230b0606061215010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010105200606060b2301010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010115120606060b230101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010e1006060619150101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101041a060606060322010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010c1606060606160c010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010118140606061e180101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101011f19060606110e0101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010122240606060d1a01010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101080d0606060a05010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101080b06060620150101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010122240606060d170101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101011f190606060b0701010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010118140606061e1b010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010c1d060606060f0c0101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101011a0d060606032201010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010e110606061e1b01010101010101010101010101010101
01010101010101010101010101010101010101010101010101010105200606060b23010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101050a0606060d13010101010101010101010101010101
01010101010101010101010101010101010101010101010101010e10060606191501010101010101010101010101010101010101010101010101010101010101
0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101130d0606060a0501010101010101010101010101
0101010101010101010101010101010101010101010101010c1606060606160c0101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101051b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1c060606110e010101010101010101010101
01010101010101010101010101010101010101010101011f19060606060606060606060606060606060606060606060606060606060606060606100c01010101
01010101010101010101010101010105160606060606060606060606060606060606060606060606060606060606060606060606160c01010101010101010101
01010101010101010101010101010101010101010101080d0606060606060606060606060606060606060606060606060606060606060606060606100c010101
01010101010101010101010101010516060606060606060606060606060606060606060606060606060606060606060606060606061c1f010101010101010101
010101010101010101010101010101010101010122030606060606060606060606060606060606060606060606060606060606060606060606060606100c0101
01010101010101010101010101011606060b19191919191919191919191919191919191919191919191919191919191919191919191912180101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101050d0606070101
01010101010101010101010101011406061701010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010a0606090101
01010101010101010101010101180606061501010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101210606100401
01010101010101010101010101160606190101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101050606060e01
010101010101010101010101011406061a0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101012006060f01
0101010101010101010101011b060606150101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011306061104
0101010101010101010101011606061c010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011506060602
0101010101010101010101011e06061a010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010112060616
01010101010101010101011f0606061f010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010117060614
01010101010101010101011d06061c01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010115060606
1b010101010101010101011c06061a01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101190606
160101010101010101011f0606061b01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011a0606
1e0101010101010101011a06061c0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011f0606
061f01010101010101011c06061d0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011c06
061a010101010101011f0606061b0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011d06
061c010101010101011a06061e010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011b06
0606150101010101011c060616010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010114
06061a0101010101150606061b010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010116
06061201010101011a06061401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010118
06060615010101011906061601010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
14060613010101150606061801010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
0f060612010101170606140101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
02060606050101120606160101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
04100606130115060606020101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010f06060a0113060614010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010e060606051206060f010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01040b06060806060602010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010306060a06061104010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010706060d06060f01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010c0d060606060201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010103060606100401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010101080606060f0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
0101010c0d06060e0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
010101010a060b040101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101080609010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101050607010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010304010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101040000002701ffff010000000000}}}}}\\sectd \\ltrsect\\linex0\\endnhere\\sectdefaultcl\\sftnbj {\\rtlch\\fcs1 \\af37 
\\ltrch\\fcs0 \\insrsid2709252 
\\par }{\\*\\themedata 504b030414000600080000002100e9de0fbfff0000001c020000110000005b436f6e74656e745f54797065735d2e786d6cac91cb4ec3301045f748fc83e52d4a
9cb2400825e982c78ec7a27cc0c8992416c9d8b2a755fbf74cd25442a820166c2cd933f79e3be372bd1f07b5c3989ca74aaff2422b24eb1b475da5df374fd9ad
5689811a183c61a50f98f4babebc2837878049899a52a57be670674cb23d8e90721f90a4d2fa3802cb35762680fd800ecd7551dc18eb899138e3c943d7e503b6
b01d583deee5f99824e290b4ba3f364eac4a430883b3c092d4eca8f946c916422ecab927f52ea42b89a1cd59c254f919b0e85e6535d135a8de20f20b8c12c3b0
0c895fcf6720192de6bf3b9e89ecdbd6596cbcdd8eb28e7c365ecc4ec1ff1460f53fe813d3cc7f5b7f020000ffff0100504b030414000600080000002100a5d6
a7e7c0000000360100000b0000005f72656c732f2e72656c73848fcf6ac3100c87ef85bd83d17d51d2c31825762fa590432fa37d00e1287f68221bdb1bebdb4f
c7060abb0884a4eff7a93dfeae8bf9e194e720169aaa06c3e2433fcb68e1763dbf7f82c985a4a725085b787086a37bdbb55fbc50d1a33ccd311ba548b6309512
0f88d94fbc52ae4264d1c910d24a45db3462247fa791715fd71f989e19e0364cd3f51652d73760ae8fa8c9ffb3c330cc9e4fc17faf2ce545046e37944c69e462
a1a82fe353bd90a865aad41ed0b5b8f9d6fd010000ffff0100504b0304140006000800000021006b799616810000008a0000001c0000007468656d652f746865
6d652f7468656d654d616e616765722e786d6c0ccc4d0ac3201040e17da17790d93763bb284562b2cbaebbf600439c1a41c7a0d29fdbd7e5e38337cedf14d59b
4b0d592c9c070d8a65cd2e88b7f07c2ca71ba8da481cc52c6ce1c715e6e97818c9b48d13df49c873517d23d59085adb5dd20d6b52bd521ef2cdd5eb9246a3d8b
4757e8d3f729e245eb2b260a0238fd010000ffff0100504b0304140006000800000021007b43bc5d8d070000cf200000160000007468656d652f7468656d652f
7468656d65312e786d6cec595f8b1bc9117f0fe43b0cf32eebdf8cfe2c960f692479cfdeb58d253bdc63afd49a696fcfb4e86eed5a1c86e07bca4b207077e425
90b73c1cc71ddc418ebce4c3186c92cb874875cf68d42db5ecddc504137605cb4ceb57d5bfaeaaae2a75dffdec654abd0bcc056159cfafdfa9f91ece666c4eb2
b8e73f9b8e2b1ddf131265734459867bfe1a0bffb37bbffdcd5d7424139c620fe43371847a7e22e5f2a85a15331846e20e5be20cbe5b309e2209af3caece39ba
04bd29ad366ab556354524f3bd0ca5a0f6f1624166d89b2a95febd8df21185d74c0a3530a37ca254634b4263e7e77585106b1151ee5d20daf3619e39bb9ce297
d2f7281212bee8f935fde757efddada2a34288ca03b286dc58ff157285c0fcbca1e7e4f1593969108441ab5fead7002af771a3f6a8356a95fa3400cd66b0d29c
8badb3dd8882026b80f24787ee617bd8ac5b78437f738f733f541f0baf41b9fe600f3f1e4760450baf41393edcc38783ee6068ebd7a01cdfdac3b76bfd61d0b6
f46b50424976be87ae85ad66b4596d0959307aec8477c360dc6e14cab728888632bad4140b96c943b196a2178c8f01a0801449927972bdc40b3483288e102567
9c7827244e20f096286302866b8ddab8d684ffea13e827ed5174849121ad780113b137a4f87862c6c952f6fc07a0d537206f7ff9e5cdeb9fdfbcfefb9bafbe7a
f3fa87626eadca923b46596ccafdfab73ffde72fbff7fefdd35f7ffdfa9b7cea5dbc30f1efbeffc3bb7ffcf37dea61c55b53bcfdf6c7773ffff8f6cf7ffcd777
5f3bb4f7393a33e1539262e13dc297de5396c2021dfcf119bf9ec43441c494e867b1401952b338f48f6462a11fad11450edc00db767cce21d5b880f7572f2cc2
9384af2471687c98a416f094313a60dc6985876a2ec3ccd35516bb27e72b13f714a10bd7dc11ca2c2f8f564bc8b1c4a5324ab045f30945994431ceb0f4d477ec
1c63c7eabe20c4b2eb29997126d8427a5f106f8088d32453726645d356e898a4e097b58b20f8dbb2cde9736fc0a86bd5437c6123616f20ea203fc5d432e37db4
922875a99ca2949a063f413271919cacf9ccc48d84044fc798326f34c742b8641e7358afe1f4879066dc6e3fa5ebd4467249ce5d3a4f10632672c8cea304a54b
177642b2c4c47e2ece214491f7844917fc94d93b44bd831f5076d0ddcf09b6dcfde16cf00c32ac49691b20ea9b1577f8f23e6656fc4ed67481b02bd5f4796aa5
d83e27cee818ac622bb44f30a6e812cd31f69e7dee6030604bcbe65bd20f12c82ac7d815580f901dabea3dc3027a25d5dcece7c91322ac909de0981de073bade
493c6b94a5881fd2fc08bc6eda7c04a52e7505c0633a3b37818f08f480102f4ea33c16a0c308ee835a9f24c82a60ea5db8e375cd2dff5d658fc1be7c61d1b8c2
be04197c6d1948eca6cc7b6d3345d49a601b3053045d862bdd8288e5fead882aae5a6ce5945bd89b76eb06e88eaca62725d9073ba09dde27fcdff43e8eddf071
ba1eb7622b655db3df3994528e77ba9c43b8ddde26627c4e3efdd6668856d9130cd5643f6fdd7636b79d8dff7fdfd91cdacfb7fdcca1aee3b69ff1a1cfb8ed67
8a23968fd3cf6c5b18e86ed4b1477edca30f7fd283673f0b42e944ae293e11faf847c0af9af91806959c3ef7c4e559e032814755e660020b1773a4653ccee4ef
884c26095ac21951dd574a6251a88e85b764028e8ef4b053b7c2d3557acae6f99167bdae8e37f3ca2a90dc8ed7c2721c8eab648e6eb5b7c778a57acd36d6c7ad
1b024af63a248cc96c124d0789f6665019491fee82d11c24f4ca3e0a8bae834547a9dfb86a8f05502bbd023fbb3df8b1def3c1004440084ee5a0459f2b3fe5ae
de78573bf3637afa9031ad0880367b13015b4f7715d783cb53abcb43ed0a9eb64818e16693d096d10d9e48e0c770119d6af42a34aeebebeed6a5163d650a3d1f
84d69646bbf33e1637f535c8ede6069a99998266de65cf6f35430899195af6fc051c1dc363ba84d811ea9717a231dcbfcc24cf37fc4d32cb920b394422c90dae
934e9e0d522231f728497bbe5a7ee9069ae91ca2b9d51b90103e59725d482b9f1a3970baed64bc58e09934dd6e8c284be7af90e1f35ce1fc568bdf1cac24d90a
dc3d49e697de195df1a708422c6cd79501e744c00d423db7e69cc0955899c8b6f1b753988ab46bde49e918cac7115d26a8a8286632cfe13a959774f45b6903e3
ad583318d430495108cf6255604da35ad5b4ac1a39878355f7c342ca7246d2dcd64c2baba8aae9ce62d60c9b32b063cb9b157983d5c6c490d3cc0a9fa7eedd94
dbdde4ba9d3ea1ac1260f0d27e8eaa7b85826050db4e6651538cf7d3b0cad9c5a85d3b360bfc00b5ab140923ebb7366a77ec56d608e7743078a3ca0f72bb510b
438b4d5fa92dadefcecdeb6d76f60292c710badc159542bb12ce7739828668a27b923c6dc01679298bad014fde8a939eff652dec0751238c2ab54e38aa04cda0
56e984fd66a51f86cdfa28acd78683c62b282c3249eb617e6f3f866b0cba2e6eeff5f8de0d7ebab9a9b933636995e91bfaaa26ae6ff0eb8dc337f81e81a4f365
ab31ee36bb8356a5dbec8f2bc170d0a974a3d6a0326c45ede17818859deef895ef5d6870d06f46416bd4a9b4ea5154095a3545bfd3adb48346a31fb4fb9d51d0
7f55b431b0f23c7d14b600f36a5ef7fe0b0000ffff0100504b0304140006000800000021000dd1909fb60000001b010000270000007468656d652f7468656d65
2f5f72656c732f7468656d654d616e616765722e786d6c2e72656c73848f4d0ac2301484f78277086f6fd3ba109126dd88d0add40384e4350d363f2451eced0d
ae2c082e8761be9969bb979dc9136332de3168aa1a083ae995719ac16db8ec8e4052164e89d93b64b060828e6f37ed1567914b284d262452282e3198720e274a
939cd08a54f980ae38a38f56e422a3a641c8bbd048f7757da0f19b017cc524bd62107bd5001996509affb3fd381a89672f1f165dfe514173d9850528a2c6cce0
239baa4c04ca5bbabac4df000000ffff0100504b01022d0014000600080000002100e9de0fbfff0000001c020000110000000000000000000000000000000000
5b436f6e74656e745f54797065735d2e786d6c504b01022d0014000600080000002100a5d6a7e7c0000000360100000b00000000000000000000000000100100
005f72656c732f2e72656c73504b01022d00140006000800000021006b799616810000008a0000001c00000000000000000000000000190200007468656d652f
7468656d652f7468656d654d616e616765722e786d6c504b01022d00140006000800000021007b43bc5d8d070000cf2000001600000000000000000000000000
d60200007468656d652f7468656d652f7468656d65312e786d6c504b01022d00140006000800000021000dd1909fb60000001b01000027000000000000000000
00000000970a00007468656d652f7468656d652f5f72656c732f7468656d654d616e616765722e786d6c2e72656c73504b050600000000050005005d010000920b00000000}
{\\*\\colorschememapping 3c3f786d6c2076657273696f6e3d22312e302220656e636f64696e673d225554462d3822207374616e64616c6f6e653d22796573223f3e0d0a3c613a636c724d
617020786d6c6e733a613d22687474703a2f2f736368656d61732e6f70656e786d6c666f726d6174732e6f72672f64726177696e676d6c2f323030362f6d6169
6e22206267313d226c743122207478313d22646b3122206267323d226c743222207478323d22646b322220616363656e74313d22616363656e74312220616363
656e74323d22616363656e74322220616363656e74333d22616363656e74332220616363656e74343d22616363656e74342220616363656e74353d22616363656e74352220616363656e74363d22616363656e74362220686c696e6b3d22686c696e6b2220666f6c486c696e6b3d22666f6c486c696e6b222f3e}
{\\*\\latentstyles\\lsdstimax375\\lsdlockeddef0\\lsdsemihiddendef0\\lsdunhideuseddef0\\lsdqformatdef0\\lsdprioritydef99{\\lsdlockedexcept \\lsdqformat1 \\lsdpriority0 \\lsdlocked0 Normal;\\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 1;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 4;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 7;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 9;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 1;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 5;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 9;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 6;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 9;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal Indent;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footnote text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 header;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footer;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index heading;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority35 \\lsdlocked0 caption;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 table of figures;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 envelope address;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 envelope return;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footnote reference;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation reference;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 line number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 page number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 endnote reference;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 endnote text;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 table of authorities;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 macro;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 toa heading;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 5;\\lsdqformat1 \\lsdpriority10 \\lsdlocked0 Title;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Closing;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Signature;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority1 \\lsdlocked0 Default Paragraph Font;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 4;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Message Header;\\lsdqformat1 \\lsdpriority11 \\lsdlocked0 Subtitle;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Salutation;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Date;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text First Indent;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text First Indent 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Note Heading;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Block Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Hyperlink;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 FollowedHyperlink;\\lsdqformat1 \\lsdpriority22 \\lsdlocked0 Strong;
\\lsdqformat1 \\lsdpriority20 \\lsdlocked0 Emphasis;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Document Map;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Plain Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 E-mail Signature;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Top of Form;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Bottom of Form;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal (Web);\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Acronym;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Address;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Cite;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Code;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Definition;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Keyboard;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Preformatted;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Sample;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Typewriter;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Variable;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal Table;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation subject;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 No List;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 1;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 3;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 6;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 6;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Contemporary;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Elegant;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Professional;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Subtle 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Subtle 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 2;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Balloon Text;\\lsdpriority39 \\lsdlocked0 Table Grid;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Theme;\\lsdsemihidden1 \\lsdlocked0 Placeholder Text;
\\lsdqformat1 \\lsdpriority1 \\lsdlocked0 No Spacing;\\lsdpriority60 \\lsdlocked0 Light Shading;\\lsdpriority61 \\lsdlocked0 Light List;\\lsdpriority62 \\lsdlocked0 Light Grid;\\lsdpriority63 \\lsdlocked0 Medium Shading 1;\\lsdpriority64 \\lsdlocked0 Medium Shading 2;
\\lsdpriority65 \\lsdlocked0 Medium List 1;\\lsdpriority66 \\lsdlocked0 Medium List 2;\\lsdpriority67 \\lsdlocked0 Medium Grid 1;\\lsdpriority68 \\lsdlocked0 Medium Grid 2;\\lsdpriority69 \\lsdlocked0 Medium Grid 3;\\lsdpriority70 \\lsdlocked0 Dark List;
\\lsdpriority71 \\lsdlocked0 Colorful Shading;\\lsdpriority72 \\lsdlocked0 Colorful List;\\lsdpriority73 \\lsdlocked0 Colorful Grid;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 1;\\lsdpriority61 \\lsdlocked0 Light List Accent 1;
\\lsdpriority62 \\lsdlocked0 Light Grid Accent 1;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 1;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 1;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 1;\\lsdsemihidden1 \\lsdlocked0 Revision;
\\lsdqformat1 \\lsdpriority34 \\lsdlocked0 List Paragraph;\\lsdqformat1 \\lsdpriority29 \\lsdlocked0 Quote;\\lsdqformat1 \\lsdpriority30 \\lsdlocked0 Intense Quote;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 1;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 1;
\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 1;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 1;\\lsdpriority70 \\lsdlocked0 Dark List Accent 1;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 1;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 1;
\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 1;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 2;\\lsdpriority61 \\lsdlocked0 Light List Accent 2;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 2;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 2;
\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 2;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 2;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 2;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 2;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 2;
\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 2;\\lsdpriority70 \\lsdlocked0 Dark List Accent 2;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 2;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 2;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 2;
\\lsdpriority60 \\lsdlocked0 Light Shading Accent 3;\\lsdpriority61 \\lsdlocked0 Light List Accent 3;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 3;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 3;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 3;
\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 3;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 3;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 3;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 3;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 3;
\\lsdpriority70 \\lsdlocked0 Dark List Accent 3;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 3;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 3;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 3;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 4;
\\lsdpriority61 \\lsdlocked0 Light List Accent 4;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 4;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 4;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 4;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 4;
\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 4;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 4;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 4;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 4;\\lsdpriority70 \\lsdlocked0 Dark List Accent 4;
\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 4;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 4;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 4;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 5;\\lsdpriority61 \\lsdlocked0 Light List Accent 5;
\\lsdpriority62 \\lsdlocked0 Light Grid Accent 5;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 5;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 5;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 5;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 5;
\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 5;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 5;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 5;\\lsdpriority70 \\lsdlocked0 Dark List Accent 5;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 5;
\\lsdpriority72 \\lsdlocked0 Colorful List Accent 5;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 5;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 6;\\lsdpriority61 \\lsdlocked0 Light List Accent 6;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 6;
\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 6;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 6;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 6;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 6;
\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 6;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 6;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 6;\\lsdpriority70 \\lsdlocked0 Dark List Accent 6;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 6;
\\lsdpriority72 \\lsdlocked0 Colorful List Accent 6;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 6;\\lsdqformat1 \\lsdpriority19 \\lsdlocked0 Subtle Emphasis;\\lsdqformat1 \\lsdpriority21 \\lsdlocked0 Intense Emphasis;
\\lsdqformat1 \\lsdpriority31 \\lsdlocked0 Subtle Reference;\\lsdqformat1 \\lsdpriority32 \\lsdlocked0 Intense Reference;\\lsdqformat1 \\lsdpriority33 \\lsdlocked0 Book Title;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority37 \\lsdlocked0 Bibliography;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority39 \\lsdlocked0 TOC Heading;\\lsdpriority41 \\lsdlocked0 Plain Table 1;\\lsdpriority42 \\lsdlocked0 Plain Table 2;\\lsdpriority43 \\lsdlocked0 Plain Table 3;\\lsdpriority44 \\lsdlocked0 Plain Table 4;
\\lsdpriority45 \\lsdlocked0 Plain Table 5;\\lsdpriority40 \\lsdlocked0 Grid Table Light;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light;\\lsdpriority47 \\lsdlocked0 Grid Table 2;\\lsdpriority48 \\lsdlocked0 Grid Table 3;\\lsdpriority49 \\lsdlocked0 Grid Table 4;
\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 1;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 1;
\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 1;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 1;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 1;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 1;
\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 1;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 2;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 2;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 2;
\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 2;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 2;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 2;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 2;
\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 3;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 3;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 3;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 3;
\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 3;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 3;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 3;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 4;
\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 4;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 4;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 4;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 4;
\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 4;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 4;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 5;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 5;
\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 5;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 5;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 5;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 5;
\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 5;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 6;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 6;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 6;
\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 6;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 6;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 6;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 6;
\\lsdpriority46 \\lsdlocked0 List Table 1 Light;\\lsdpriority47 \\lsdlocked0 List Table 2;\\lsdpriority48 \\lsdlocked0 List Table 3;\\lsdpriority49 \\lsdlocked0 List Table 4;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark;
\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 1;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 1;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 1;
\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 1;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 1;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 1;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 1;
\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 2;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 2;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 2;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 2;
\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 2;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 2;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 2;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 3;
\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 3;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 3;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 3;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 3;
\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 3;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 3;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 4;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 4;
\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 4;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 4;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 4;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 4;
\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 4;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 5;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 5;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 5;
\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 5;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 5;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 5;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 5;
\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 6;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 6;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 6;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 6;
\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 6;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 6;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Mention;
\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Smart Hyperlink;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Hashtag;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Unresolved Mention;}}{\\*\\datastore 010500000200000018000000
4d73786d6c322e534158584d4c5265616465722e362e1000000000000000000000060000
d0cf11e0a1b11ae1000000000000000000000000000000003e000100feff090006000000000000000000000001000000010000000000000000100000feffffff00000000feffffff0000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fffffffffffffffffdfffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffff52006f006f007400200045006e00740072007900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016000500ffffffffffffffffffffffff0c6ad98892f1d411a65f0040963251e50000000000000000000000003073
2b87fc62d501feffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000105000000000000}}`;
    let elem: HTMLElement = createElement('p', {
     id: 'imagePaste', innerHTML: localElem
   });
   editorObj = new EditorManager({ document: document, editableElement: document.getElementById('content-edit') });
   let elem1: HTMLElement = createElement('p', {
     id: 'imagePaste', innerHTML: localElem1
   });
   (editorObj.msWordPaste as any).breakLineAddition(elem1);
   (editorObj.msWordPaste as any).imageConversion(elem, rtfData);
   expect(elem.querySelectorAll('img')[0].getAttribute('src').indexOf('base64') >= 0);
  });

  it('V Shape image paste from MSWord', () => {
    let localElem1: string = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Microsoft Word 15">
    <meta name="Originator" content="Microsoft Word 15">
    <link rel="File-List" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_filelist.xml">
    <link rel="Edit-Time-Data" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_editdata.mso">
    <!--[if !mso]>
    <style>
    v\:* {behavior:url(#default#VML);}
    o\:* {behavior:url(#default#VML);}
    w\:* {behavior:url(#default#VML);}
    .shape {behavior:url(#default#VML);}
    </style>
    <![endif]--><!--[if gte mso 9]><xml>
     <o:OfficeDocumentSettings>
      <o:RelyOnVML/>
      <o:AllowPNG/>
     </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <link rel="themeData" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_themedata.thmx">
    <link rel="colorSchemeMapping" href="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_colorschememapping.xml">
    <style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:Batang;
      panose-1:2 3 6 0 0 1 1 1 1 1;
      mso-font-alt:바탕;
      mso-font-charset:129;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-1342176593 1775729915 48 0 524447 0;}
    @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
    @font-face
      {font-family:"\@Batang";
      panose-1:2 3 6 0 0 1 1 1 1 1;
      mso-font-charset:129;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-1342176593 1775729915 48 0 524447 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-name:"Normal\,Alemba body text";
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:DengXian;
      mso-fareast-theme-font:minor-fareast;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-fareast-language:ZH-CN;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:35.4pt;
      mso-footer-margin:35.4pt;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:"Table Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-fareast-language:ZH-CN;}
    </style>
    <![endif]-->
    <!--StartFragment-->
    <p class="MsoNormal" style="margin-top:12.0pt;margin-right:0in;margin-bottom:
    6.0pt;margin-left:0in"><span lang="EN-GB">page</span><span style="mso-ansi-language:
    EN-US;mso-fareast-language:ZH-CN;mso-no-proof:yes"><v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
     <v:stroke joinstyle="miter">
     <v:formulas>
      <v:f eqn="if lineDrawn pixelLineWidth 0">
      <v:f eqn="sum @0 1 0">
      <v:f eqn="sum 0 0 @1">
      <v:f eqn="prod @2 1 2">
      <v:f eqn="prod @3 21600 pixelWidth">
      <v:f eqn="prod @3 21600 pixelHeight">
      <v:f eqn="sum @0 0 1">
      <v:f eqn="prod @6 1 2">
      <v:f eqn="prod @7 21600 pixelWidth">
      <v:f eqn="sum @8 21600 0">
      <v:f eqn="prod @7 21600 pixelHeight">
      <v:f eqn="sum @10 21600 0">
     </v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:formulas>
     <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect">
     <o:lock v:ext="edit" aspectratio="t">
    </o:lock></v:path></v:stroke></v:shapetype><v:shape id="Picture_x0020_2" o:spid="_x0000_i1025" type="#_x0000_t75" style="width:30.5pt;height:21pt;visibility:visible" o:gfxdata="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
    AAAA
    ">
     <v:imagedata src="file:///C:/Users/REVANT~2/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png" o:title="">
    </v:imagedata></v:shape></span><span lang="EN-GB">home </span><b style="mso-bidi-font-weight:
    normal"><span lang="EN-GB" style="font-size:14.0pt;line-height:107%"><o:p></o:p></span></b></p>
    <!--EndFragment-->`;
    let rtfData1: string = `{\\rtf1\\adeflang1025\\ansi\\ansicpg1252\\uc1\\adeff31507\\deff0\\stshfdbch31505\\stshfloch31506\\stshfhich31506\\stshfbi31507\\deflang1033\\deflangfe1033\\themelang1033\\themelangfe2052\\themelangcs0{\\fonttbl{\\f0\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}
    {\\f12\\fbidi \\froman\\fcharset129\\fprq2{\\*\\panose 02030600000101010101}Batang{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}{\\f34\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02040503050406030204}Cambria Math;}
    {\\f37\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0502020204030204}Calibri;}{\\f461\\fbidi \\froman\\fcharset129\\fprq2{\\*\\panose 02030600000101010101}@Batang;}{\\flomajor\\f31500\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}
    {\\fdbmajor\\f31501\\fbidi \\fnil\\fcharset134\\fprq2 DengXian Light{\\*\\falt \\'b5\\'c8\\'cf\\'df Light};}{\\fhimajor\\f31502\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0302020204030204}Calibri Light;}
    {\\fbimajor\\f31503\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\flominor\\f31504\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}
    {\\fdbminor\\f31505\\fbidi \\fnil\\fcharset134\\fprq2{\\*\\panose 02010600030101010101}DengXian{\\*\\falt \\'b5\\'c8\\'cf\\'df};}{\\fhiminor\\f31506\\fbidi \\fswiss\\fcharset0\\fprq2{\\*\\panose 020f0502020204030204}Calibri;}
    {\\fbiminor\\f31507\\fbidi \\froman\\fcharset0\\fprq2{\\*\\panose 02020603050405020304}Times New Roman;}{\\f462\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\f463\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}
    {\\f465\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\f466\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\f467\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\f468\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}
    {\\f469\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\f470\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\f584\\fbidi \\froman\\fcharset0\\fprq2 Batang Western{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}
    {\\f582\\fbidi \\froman\\fcharset238\\fprq2 Batang CE{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}{\\f583\\fbidi \\froman\\fcharset204\\fprq2 Batang Cyr{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}{\\f585\\fbidi \\froman\\fcharset161\\fprq2 Batang Greek{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}
    {\\f586\\fbidi \\froman\\fcharset162\\fprq2 Batang Tur{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}{\\f589\\fbidi \\froman\\fcharset186\\fprq2 Batang Baltic{\\*\\falt \\'b9\\'d9\\'c5\\'c1};}{\\f802\\fbidi \\froman\\fcharset238\\fprq2 Cambria Math CE;}
    {\\f803\\fbidi \\froman\\fcharset204\\fprq2 Cambria Math Cyr;}{\\f805\\fbidi \\froman\\fcharset161\\fprq2 Cambria Math Greek;}{\\f806\\fbidi \\froman\\fcharset162\\fprq2 Cambria Math Tur;}{\\f809\\fbidi \\froman\\fcharset186\\fprq2 Cambria Math Baltic;}
    {\\f810\\fbidi \\froman\\fcharset163\\fprq2 Cambria Math (Vietnamese);}{\\f832\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri CE;}{\\f833\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Cyr;}{\\f835\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Greek;}
    {\\f836\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Tur;}{\\f837\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri (Hebrew);}{\\f838\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri (Arabic);}{\\f839\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Baltic;}
    {\\f840\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri (Vietnamese);}{\\f5074\\fbidi \\froman\\fcharset0\\fprq2 @Batang Western;}{\\f5072\\fbidi \\froman\\fcharset238\\fprq2 @Batang CE;}{\\f5073\\fbidi \\froman\\fcharset204\\fprq2 @Batang Cyr;}
    {\\f5075\\fbidi \\froman\\fcharset161\\fprq2 @Batang Greek;}{\\f5076\\fbidi \\froman\\fcharset162\\fprq2 @Batang Tur;}{\\f5079\\fbidi \\froman\\fcharset186\\fprq2 @Batang Baltic;}{\\flomajor\\f31508\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}
    {\\flomajor\\f31509\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\flomajor\\f31511\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\flomajor\\f31512\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}
    {\\flomajor\\f31513\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\flomajor\\f31514\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\flomajor\\f31515\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}
    {\\flomajor\\f31516\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\fdbmajor\\f31520\\fbidi \\fnil\\fcharset0\\fprq2 DengXian Light Western{\\*\\falt \\'b5\\'c8\\'cf\\'df Light};}
    {\\fdbmajor\\f31518\\fbidi \\fnil\\fcharset238\\fprq2 DengXian Light CE{\\*\\falt \\'b5\\'c8\\'cf\\'df Light};}{\\fdbmajor\\f31519\\fbidi \\fnil\\fcharset204\\fprq2 DengXian Light Cyr{\\*\\falt \\'b5\\'c8\\'cf\\'df Light};}
    {\\fdbmajor\\f31521\\fbidi \\fnil\\fcharset161\\fprq2 DengXian Light Greek{\\*\\falt \\'b5\\'c8\\'cf\\'df Light};}{\\fhimajor\\f31528\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri Light CE;}{\\fhimajor\\f31529\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Light Cyr;}
    {\\fhimajor\\f31531\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Light Greek;}{\\fhimajor\\f31532\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Light Tur;}{\\fhimajor\\f31533\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri Light (Hebrew);}
    {\\fhimajor\\f31534\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri Light (Arabic);}{\\fhimajor\\f31535\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Light Baltic;}{\\fhimajor\\f31536\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri Light (Vietnamese);}
    {\\fbimajor\\f31538\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\fbimajor\\f31539\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\fbimajor\\f31541\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}
    {\\fbimajor\\f31542\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\fbimajor\\f31543\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\fbimajor\\f31544\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}
    {\\fbimajor\\f31545\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\fbimajor\\f31546\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\flominor\\f31548\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}
    {\\flominor\\f31549\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\flominor\\f31551\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}{\\flominor\\f31552\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}
    {\\flominor\\f31553\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\flominor\\f31554\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}{\\flominor\\f31555\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}
    {\\flominor\\f31556\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}{\\fdbminor\\f31560\\fbidi \\fnil\\fcharset0\\fprq2 DengXian Western{\\*\\falt \\'b5\\'c8\\'cf\\'df};}
    {\\fdbminor\\f31558\\fbidi \\fnil\\fcharset238\\fprq2 DengXian CE{\\*\\falt \\'b5\\'c8\\'cf\\'df};}{\\fdbminor\\f31559\\fbidi \\fnil\\fcharset204\\fprq2 DengXian Cyr{\\*\\falt \\'b5\\'c8\\'cf\\'df};}
    {\\fdbminor\\f31561\\fbidi \\fnil\\fcharset161\\fprq2 DengXian Greek{\\*\\falt \\'b5\\'c8\\'cf\\'df};}{\\fhiminor\\f31568\\fbidi \\fswiss\\fcharset238\\fprq2 Calibri CE;}{\\fhiminor\\f31569\\fbidi \\fswiss\\fcharset204\\fprq2 Calibri Cyr;}
    {\\fhiminor\\f31571\\fbidi \\fswiss\\fcharset161\\fprq2 Calibri Greek;}{\\fhiminor\\f31572\\fbidi \\fswiss\\fcharset162\\fprq2 Calibri Tur;}{\\fhiminor\\f31573\\fbidi \\fswiss\\fcharset177\\fprq2 Calibri (Hebrew);}
    {\\fhiminor\\f31574\\fbidi \\fswiss\\fcharset178\\fprq2 Calibri (Arabic);}{\\fhiminor\\f31575\\fbidi \\fswiss\\fcharset186\\fprq2 Calibri Baltic;}{\\fhiminor\\f31576\\fbidi \\fswiss\\fcharset163\\fprq2 Calibri (Vietnamese);}
    {\\fbiminor\\f31578\\fbidi \\froman\\fcharset238\\fprq2 Times New Roman CE;}{\\fbiminor\\f31579\\fbidi \\froman\\fcharset204\\fprq2 Times New Roman Cyr;}{\\fbiminor\\f31581\\fbidi \\froman\\fcharset161\\fprq2 Times New Roman Greek;}
    {\\fbiminor\\f31582\\fbidi \\froman\\fcharset162\\fprq2 Times New Roman Tur;}{\\fbiminor\\f31583\\fbidi \\froman\\fcharset177\\fprq2 Times New Roman (Hebrew);}{\\fbiminor\\f31584\\fbidi \\froman\\fcharset178\\fprq2 Times New Roman (Arabic);}
    {\\fbiminor\\f31585\\fbidi \\froman\\fcharset186\\fprq2 Times New Roman Baltic;}{\\fbiminor\\f31586\\fbidi \\froman\\fcharset163\\fprq2 Times New Roman (Vietnamese);}}{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red0\\green255\\blue255;\\red0\\green255\\blue0;
    \\red255\\green0\\blue255;\\red255\\green0\\blue0;\\red255\\green255\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue128;\\red0\\green128\\blue128;\\red0\\green128\\blue0;\\red128\\green0\\blue128;\\red128\\green0\\blue0;\\red128\\green128\\blue0;\\red128\\green128\\blue128;
    \\red192\\green192\\blue192;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}{\\*\\defchp \\fs22\\lang1033\\langfe2052\\loch\\af31506\\hich\\af31506\\dbch\\af31505\\langfenp2052 }{\\*\\defpap \\ql \\li0\\ri0\\sa160\\sl259\\slmult1
    \\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 }\\noqfpromote {\\stylesheet{\\ql \\li0\\ri0\\sa160\\sl259\\slmult1\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 \\rtlch\\fcs1 \\af31507\\afs22\\alang1025 
    \\ltrch\\fcs0 \\fs24\\lang2057\\langfe1033\\loch\\f31506\\hich\\af31506\\dbch\\af12\\cgrid\\langnp2057\\langfenp1033 \\snext0 \\sqformat \\spriority0 \\styrsid10555431 Normal,Alemba body text;}{\\*\\cs10 \\additive \\ssemihidden \\sunhideused \\spriority1 \\styrsid10555431 
    Default Paragraph Font;}{\\*\\ts11\\tsrowd\\trftsWidthB3\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\trcbpat1\\trcfpat1\\tblind0\\tblindtype3\\tsvertalt\\tsbrdrt\\tsbrdrl\\tsbrdrb\\tsbrdrr\\tsbrdrdgl\\tsbrdrdgr\\tsbrdrh\\tsbrdrv 
    \\ql \\li0\\ri0\\sa160\\sl259\\slmult1\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0 \\rtlch\\fcs1 \\af31507\\afs22\\alang1025 \\ltrch\\fcs0 \\fs22\\lang1033\\langfe2052\\loch\\f31506\\hich\\af31506\\dbch\\af31505\\cgrid\\langnp1033\\langfenp2052 
    \\snext11 \\ssemihidden \\sunhideused Normal Table;}}{\\*\\rsidtbl \\rsid9312063\\rsid10555431}{\\mmathPr\\mmathFont34\\mbrkBin0\\mbrkBinSub0\\msmallFrac0\\mdispDef1\\mlMargin0\\mrMargin0\\mdefJc1\\mwrapIndent1440\\mintLim0\\mnaryLim1}{\\*\\xmlnstbl {\\xmlns1 http://schemas.mi
    crosoft.com/office/word/2003/wordml}}\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1440\\margb1440\\gutter0\\ltrsect 
    \\widowctrl\\ftnbj\\aenddoc\\trackmoves0\\trackformatting1\\donotembedsysfont1\\relyonvml1\\donotembedlingdata0\\grfdocevents0\\validatexml1\\showplaceholdtext0\\ignoremixedcontent0\\saveinvalidxml0\\showxmlerrors1\\noxlattoyen
    \\expshrtn\\noultrlspc\\dntblnsbdb\\nospaceforul\\formshade\\horzdoc\\dgmargin\\dghspace180\\dgvspace180\\dghorigin1701\\dgvorigin1984\\dghshow1\\dgvshow1
    \\jexpand\\pgbrdrhead\\pgbrdrfoot\\splytwnine\\ftnlytwnine\\htmautsp\\nolnhtadjtbl\\useltbaln\\alntblind\\lytcalctblwd\\lyttblrtgr\\lnbrkrule\\nobrkwrptbl\\snaptogridincell\\allowfieldendsel\\wrppunct\\asianbrkrule\\rsidroot10555431
    \\newtblstyruls\\nogrowautofit\\usenormstyforlist\\noindnmbrts\\felnbrelev\\nocxsptable\\indrlsweleven\\noafcnsttbl\\afelev\\utinl\\hwelev\\spltpgpar\\notcvasp\\notbrkcnstfrctbl\\notvatxbx\\krnprsnet\\cachedcolbal \\nouicompat \\fet0{\\*\\wgrffmtfilter 2450}
    \\nofeaturethrottle1\\ilfomacatclnup0\\ltrpar \\sectd \\ltrsect\\linex0\\headery708\\footery708\\colsx708\\endnhere\\sectlinegrid360\\sectdefaultcl\\sftnbj {\\*\\pnseclvl1\\pnucrm\\pnstart1\\pnindent720\\pnhang {\\pntxta .}}{\\*\\pnseclvl2\\pnucltr\\pnstart1\\pnindent720\\pnhang 
    {\\pntxta .}}{\\*\\pnseclvl3\\pndec\\pnstart1\\pnindent720\\pnhang {\\pntxta .}}{\\*\\pnseclvl4\\pnlcltr\\pnstart1\\pnindent720\\pnhang {\\pntxta )}}{\\*\\pnseclvl5\\pndec\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl6\\pnlcltr\\pnstart1\\pnindent720\\pnhang 
    {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl7\\pnlcrm\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl8\\pnlcltr\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}{\\*\\pnseclvl9\\pnlcrm\\pnstart1\\pnindent720\\pnhang {\\pntxtb (}{\\pntxta )}}
    \\pard\\plain \\ltrpar\\ql \\li0\\ri0\\sb240\\sa120\\sl259\\slmult1\\widctlpar\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid10555431 \\rtlch\\fcs1 \\af31507\\afs22\\alang1025 \\ltrch\\fcs0 
    \\fs24\\lang2057\\langfe1033\\loch\\af31506\\hich\\af31506\\dbch\\af12\\cgrid\\langnp2057\\langfenp1033 {\\rtlch\\fcs1 \\af31507 \\ltrch\\fcs0 \\insrsid10555431 \\hich\\af31506\\dbch\\af12\\loch\\f31506 page}{\\rtlch\\fcs1 \\af31507 \\ltrch\\fcs0 
    \\lang1024\\langfe1024\\noproof\\langnp1033\\langfenp2052\\insrsid9312063\\charrsid9312063 {\\*\\shppict{\\pict{\\*\\picprop\\shplid1025{\\sp{\\sn shapeType}{\\sv 75}}{\\sp{\\sn fFlipH}{\\sv 0}}
    {\\sp{\\sn fFlipV}{\\sv 0}}{\\sp{\\sn fLockAgainstUngrouping}{\\sv 0}}{\\sp{\\sn fLockRotation}{\\sv 0}}{\\sp{\\sn fLockAspectRatio}{\\sv 1}}{\\sp{\\sn fLockPosition}{\\sv 0}}{\\sp{\\sn fLockAgainstSelect}{\\sv 0}}{\\sp{\\sn fLockCropping}{\\sv 0}}
    {\\sp{\\sn fLockVerticies}{\\sv 0}}{\\sp{\\sn fLockText}{\\sv 0}}{\\sp{\\sn fLockAdjustHandles}{\\sv 0}}{\\sp{\\sn fLockAgainstGrouping}{\\sv 0}}{\\sp{\\sn fLine}{\\sv 0}}{\\sp{\\sn wzName}{\\sv Picture 2}}{\\sp{\\sn metroBlob}{\\sv {\\*\\svb 
    504b030414000600080000002100b18267b60a01000013020000110000005b436f6e74656e745f54797065735d2e786d6c9491c14ec3100c86ef48bc43942b6a53764008addd818e2320341e204adc36a271a23894eded49ba4d828921ed18dbdfef2fc972b5b5239b20907158f3dbb2e20c50396db0aff9fbe6a9b8e78ca2
    442d478750f31d105f35d757cbcdce03b14423d57c88d13f08416a002ba9741e30753a17ac8ce9187ae1a5fa903d884555dd09e51002c622e60cde2c5be8e4e718d97a9bca7b138f3d678ffbb9bcaae6c6663ed7c59f4480914e10e9fd68948ce96e62427de2551c9cca44ce3334184f3749fccc86dcf9edf473c1817b498f
    198c06f62a437c9636990b1d48c0c2b54e95ff6764494b85eb3aa3a06c03ad67eae8742e5bbb2f0c305d1ade26ec0da663ba98bfb4f9060000ffff0100504b03041400060008000000210038fd21ffd6000000940100000b0000005f72656c732f2e72656c73a490c16ac3100c86ef83bd83d17d719ac318a34e2fa3d06be9
    1ec0d88a631a5b4632d9faf63383c1327adb51bfd0f7897f7ff84c8b5a91255236b0eb7a50981df9988381f7cbf1e90594549bbd5d28a3811b0a1cc6c787fd19175bdb91ccb1886a942c06e65acbabd6e2664c563a2a98db66224eb6b691832ed65d6d403df4fdb3e6df0c18374c75f206f8e40750975b69e63fec141d93d0
    543b4749d33445778faa3d7de433ae8d62396035e059be43c6b56bcf81beefddfdd31bd89639ba23db846fe4b67e1ca8653f7abde972fc020000ffff0100504b030414000600080000002100c6b5e6a422020000670400000e0000006472732f65326f446f632e786d6ca4944b6fdb100cc7ef03f61d04dd5b3ff26866c4e9
    61418701c316b41b7aa6653916aa1724398f6f3f4a76baecb4a13d38a648f9cf1f292aebfb9392e4c09d1746d7b4b8cd29e19a9956e87d4d7ffd7cb85951e203e816a4d1bca667eee9fde6e387f5d156bc34bd912d770445b4af8eb6a67d08b6ca32cf7aaec0df1acb35063be314045cba7dd63a38a2ba925999e7cbec685c
    6b9d61dc7bf46ec720dd24fdaee32cfce83acf0391355dcc57cb3925a1a6cbfcd312495d4deff222475f83bea22ce634dbaca1da3bb0bd601316bc814a81d008f12ab585006470e20d5256b030388e6a6855f84c5868bd436d1251ffa5a1c0bd0cf68619652188464811cea9fb13943eec04dbb991907d3fec1c116d4d4b4a
    34283c748cc6124819db8bdc55dc13bfc06516d77f093452d80721656c5fb427543cac7f0f87e93ac1f8d6b041711dc609715c22b5d1be17d6e3a1575c351cf1dcd7b618cfdb07c703eb63c20e133fe2d44432a85e0389f20f5864f636560cd5a9732abe313539d514c7ea1c7fd320f153200c9de55db958618461a858cc66
    e52cc631c1e563eb7cf8c28d22d1403424c0de4205876f7e62b96c896e9e261b4329f110b87beadb2369e4e01e014b5bce1639a6f398bac8f19a443ba69e6c907bbcac2c38ec8609cf22f44f3d583ca83c258d993e4b470e8097a691c05e4616697b189d73944c256209d3ee548eb9a0a4d51565eadfd8b1646203d396e9a6
    c5eb71bd46fbfaff61f31b0000ffff0100504b03040a0000000000000021009ee4693ee8dc0000e8dc0000140000006472732f6d656469612f696d616765312e706e6789504e470d0a1a0a0000000d4948445200000280000001680806000001b0357ac7000000017352474200aece1ce90000000467414d410000b18f0bfc
    6105000000097048597100000ec100000ec301c76fa8640000dc7d49444154785eecfd095c15e99def8fe7f6647273f3cfcde49f576e6e6e6732ffdc4cdfdc4c6ea6273799c964e6975fa6279349d2994ca7a72793a4d3e9a4d3ad9d6e7771c1051177dc1054440404115954544051944d05c105144576040459458403673f
    7cfef57daaea50e750e7705638709e373e56d5534f2de7a96f7debfb6cdfe723e07805cf402fe119e8253c03bd8467a097f00cf4129e815ee234033ff21171f7273ef109b6b4e7c2850b6c29a77bfdf5d7d93298709a81afbcf28ab426f2cd6f7e535a03befce52f4b6b22f3e6cdc3faf5eba5ade081bfc25e32e732d078f0
    3e349f4b84e5e1a0142362d85505cda7e2a52ddfe15206ae080dc3175e7ad9ad30156ac74c15d418fdd23169cd7d465f4a95d63c675666e0c8470e486bbe41f3f92469cd7d5ccac0274f9ea0afafcf269cccbf2aedf5cd0fa21fa13cbf1a96c62169cd96caca4a696d7ad06ab5d29a0f333023ebb4b4e519740ee5f9ebebeb
    a53d80e96287b4a68e2f33d0d23622ad39c6a30cf435e33d63d29a63349f4990d69ce34f09acadadb5099a4f1f712f030d3bab58061a226e4a31be816e642a5c550d4fbe958c7d9b164b5beed3a5d5e068d401ac8bcc926226e8e8e8b009744f6e4be0a3f967a535dfe1cb0c2409d40fdc83b1ef0e469aaf48b18e79fefc39
    5bd6d4d4b06b6c89b98cf5276ea25b6bc2b2794b60ecafc2aed873a86f6851151cd732d064b12efdf10ac3322ead38c698f0505a738cf14423cb406d5f1342d72cc6a1b54b91533b82aa6b2710b272b994ca96aaaa2ab6ec7ad2c9323062f9fb283fb607fabe6a84c69d62fb643ccf4005ca0c2ccaaf46e7c4f15e4137ef28
    b883bb3a50cec0eaeaea29afe5f30c242abb6ad8322f62012a6d0d7e97b1deb8e991b8f400590d50065e3eba0bdb138eb3eda99033b0bdad992dddc5ab0c4c28efc4bb4b92b05e085a6d276a066b90766f10f34223a4143e42679656a68632f0e88605786f5e18ce5db921c53a46cec03b77eeb0a5bb782d8177f75fc4e0e0
    e0a4a05f7c15c6f44618e31ec0b0bf06a62cf1098f0f1b30ae314ee8550159025f7ef123c8ce765c46b53c985ac42903137747636de83e245d6c95621d33a103bbd9d25dbcce4025e3e3e3d0e9746c5dbff9165b8e3fd5091f805a1862efb36d6366130b4aec754f7c7689b426a2dcef6b435afe0adfba25deafbbf83403ed
    69696991d6a660ccc414b4a3e00e94813d9d5dd2d6d4c819d8d2eefcc138c2ab0c7cf8706ad342a6b8b8585af30e4bc7080c7baad9ba5a951465604a742c16fdec07528c73e40cf414af25302b6bb2c53e15999999d29a671893eaa4b5c9b00c8c89c3fe8b65cc189e8a19cf40c268143e0a0a6edc10bf7ecfce6c62cbe960
    f4cf52d852d6817bf31ea26fc4f6bed498d10c2c2a175f257b28030716fc6fb66ea8daca965319a99e32f2d158694d84e9c0de7eb78212b5fd8e02e155065608560519d079116ba41811590209cab8ceea7c69cbffc812b87fff7eb624ea5a06a4355bc842b087cc2f77f02a0329e3c870b6a7a8a8485a13d1ebf5d29a8745
    151719fb46863503a70baf3290ecb5ec924669cb314f9f3e95d6fc8f9c81d1d1d16ca9c6fd865e69cd7b7cf2117186a3aa777f31ab243010712503ed2b465bdb6cb7293c7efc584aed1cbf6520957d593958284950bb2c4922958db5af5f60c15fb8928121d92d3661e9e916b4b5b5d984f6f67629b573e69c049acd66180c
    86690b4ae64406ce242e65607f7fbf4d93a32b612ad48e992a04222e6520c7313c03bdc4e50c5cb56a15c2c3c3b17bf76ee4e6e64ab1406464242b755058bc586c9b5d11ba1ebb76edc2b367cfd83154f140fbe463294ea3d1b0201f4741eea079f2e4496cdebc99a5a3654848088ba76d62efdebd6c49d77ef468a24d85ae
    239780d6ac5983e4e464b6be61c306646464b0b4146f32893536090909ac0704c5d3b9cf9d3bc7e2d578f2d257a5355bb804ba48ffbfee144a0872f174029e815e32a319480d514aeedebdcb966565656c49af3bc5a5a7a7b3edb3677ddf43c219e5d27d101bc2c2a435b1e2e4f469b1331597402fe119e8253c03bd8467a0
    97f00cf4129e815ec233d04bdcce40795c1c47c4616e50462933ebc73ffe315b52dc0b2fbcc0d695830baf5c99ba6bed5cc46106d240430a9b366dc2cf7ffe732c5bb68c65923c00914a05f2e0c26f7ffbdb6c198cf0f7d14be65c0652af08c376db9ea7e36d2318fd7c124c399e772776c49419481d28d5c6ad390b53e943
    aa7f533bce5950b684c9980a5c6b8654637c7072170f4f98d5191808b89481bdbdbd368d3badadad30ecbbc7f6d32b63b15830f6dd6cb64db89281632f67485b1328af41d75532bacbb3eeb8aea27bd7b66f8f237eb7ffb2b426e252062a7f98f5070e8ab5b39481b939b9d08755b06dc2950cd47c224eda9a40797eb9272c
    eb9c2e30950486bcfbaeb4e65f3ccac0a9b01f14e84a06ba82ee83898ee733f50ad7d5d559071a3e78f0c0b30c74b7d3b7af325089ff32d0828bb75b71b1aa4dda16044231003b4fb077a937ffea254b70f3e64dff48a03dd3998163df14fb5e6fde791675f7cee1973f78936d3b42ee7647030d292447c7b2418aab97be27
    84f958b7fb2c56876dc1072b57b374f6b89781268bdf32707c600a33c26e30e254129870b21a4732840f81d980938929080f57f787200fb2a19e5814b4fd4dd0f75561d5e23f2032e630dbe70caf2490061966c74760d53ae763735dc940faf8380af29006256a19683cfc405a731de540430aeee25506d2c0421a27a7edac
    c69e84722c5dac3e44cbf557780823578e4aeb13a8e95c5fe94039033bda9b5dee0fa8c4eb0cd47616b281853ffddbd7f0dac2706486be23ed9dc0173a50bf72a24991b0cf40d309db6ec6171a46f0f0b6ed585f3594030d3d196ce871063ecf5d03b3f01bfa961520313171f24043bd1eba370b58da7b4bc48138244964c7
    e97e5f28e4c8c4e84b39034bb2e311119586a808db919e56091c9b1834a3cc4073c9e4615d3b6392b17787e33ed232f63ad05d3cca4067a38ce4466fc274ee114c675a51f71fe2b85dd3c966e8d7ddc0f8a8ede01739032322d475e9a45758f8a0f8ea15560e34f464b0a1c712d8d0d0c096cec8c9c9614b575e61ca244741
    36cc8dd1627191d0fc3407e6f21e69cb11660c28245d0d390349fa5a3d186ce8950e7415ca40675f385774a08c5c6ba27dae614b47ac0c5987d25bd7a42dc7783bcc6b5a32f0f265db8b500f5725ee64a08cf2152653c79e0369b791b67feaa165019381f6f1ba13af63fc49264c6d8e3b00c97dad3dcdc0b1ef3af68ef4ec
    492b9e754f7dde19cdc008fa5a6a3ba52d47bda586a0298b91d66df13603d5d0af2e674bb581818e8212b5fdce825719b822816a479a99c30999f272f107c874dcb980d50bc51ea5f6f83203475e3828ad0958cd1df7d48d2b23aaec07277a9581cdc21f19cf6fbef22f528c3a8fb3455bcbdebf4c77b7e8e4c1971238dd78
    9581e5428ec846ef8a57becb966ad057d8d960435f67e084b9e35c02dd1dd6aa26a15e652015e59c39dab13c780a737127cb40aae657a2bc99a0954057f14559d81e6f33d07e60a1a3b8a9f06b06ca7e632803491265a9b334db9a0e339181f6830d09fbc186ae302725506d40a03f8392a07985fdc5941948289b1b5d0953
    59fb54f5a5769cb360ff510a145cca408e6378067a894b194883046930dee8e828dba68181f41a0e0d895f591a344803fb6880e19fbef49788da7f880dc327df59a4ef68a09f7c2cc5d1b194968e79f5d557593c417134d090a0e3e81cb4a4818e948e0617d23a0d120c0b0b63db847c3f14e83ab44df744f72d0f38a4af6c
    737333ab1ca6f3d2f1049d83caf89ee865824ba08bb4d5a8d76ff20cf49219cf4079ec310d30a45790203388c2c58b1759dcb56b53d734cf145c02bd8467206746e102c89951b8007266142e809c19850b206746f14800e561c4caa1c4ce70351d27f8f08964c802262fc9cf1aad7fec631f63db723c4d9841ebcab1eeb49d
    9a2a0e46a07539adfd3ecedcc4270228d7e90f0f0fb3e5a73ef529b6941df4c942252f09ea91ae74b6a0dc4728f771e62e3e11407bc8310587e30a7e11400ec7557c268034e2561e75e6af401e1abc817c09ab9dd797810690c9a687bbd0b87ce6414231eb9eaf20470c637fedfe0c58fec6270248fdde6c275fff19427ffb
    32fee96f5ec6fbbf784311ef5d98aaafdc54509f0d3a4fc28e5064ecd8824b9971f8d586bd93aee36d70d6ffce94d706ed0f1c3ba99e6e342f4e1e633c9df84c00a76396075f08e074200ba0b9a26792eb2947500728b5be90d31d86ff6fba6abcb7c1519f4e9f0aa078b18728bd94876b7967b037211bd71f3d44dc81fdd6
    1b39992f0ecfc8ce3e8fad1151b8d2aab1ba47783af01459d1bbd92857357c258074add493b9a87dd284e8a452943d3100860e6c3b51611dbb48f79a5f7a49b8ff3e441dccc3cd4ef1fe69e0a9230d47136cd37cfb9ef440a65e7639bbc270bbb70b51478fa2b8ae1746e1004a1a69e68f710c345e8359f83b7cf20a8a2f5e
    c6c1c8ed6818f0ec53ef12e4e7c3e09d29208f8aa6bef88ef2846b402f197d69723da5270278b3a25275e06e20402f95374cbb002e0fdf81f0a8445476096f767d3d52af8a858782ba11546645212ae43d14145e41e2a6f760ca6e619ec72cf5cf581a67f84200e589d889c17b69c8ddb692f96e9998db521cbcb62e2c9ec5
    ad094b4361a756da3f3109bb3361f144001f1cb39d913ad0181f9a3cf7074143ba5efdc637d0d9d9c99c4ed076d91ffd115b926f2cca27af0490cd939ed104c36eb14fb03c1f9c6e61295b1224808fe69f45a7709379555d482ca8474b5529de5b1e0efd48170a3c987f580d5f0b607e5a1813be1aed8460c52f5e8acac1a9
    67fbf7b500ca73e1ddaeaaf15b50c372bb0f0f0befaaa69f2a501e4c15c8c7854f34a07e4325f4e195d0be9acbaa0b0cdb6f432fd86ab42d6b40f9a232349c98e82c144716788baf0590c84f8b42447cb6d351bb6a287fa73d6e0ba0606fc90248145cb77d014669aaa9e111b63ee4815d462d54722b15411e5e9e7475b2a5
    fdef181dd1606860e26b669e62609f237b5dc98cd980f45073f3ab5124045f108836a01aee08e078872858b200de49db87fcc4ddd8bcff30962f598c756bb7a1385ddda59bab50dda4ece0ca1e12c0e43d7bb075fd2284ad5fe3d28cf44a025a007d8d2f04d099e69a0a57329b70590015da4c16c0dca8ed8849bd85eb57af
    20796f2ccaef77626d6406562ed880e3674ab0ebc8556c5bbb149d5ad7c71cdb0b6047471b3ada1f310da87ba7508af51f5c0025d827f89353bbf474844130415c39de1d0d28230b60dbddeb68afb90e9df0ed6be970d32e7080330d381d4c9b009286500b9e40851fd977a38c5200dd75f742b04fb0606fe9975d53bdcfa9
    82b2294bf329c79f456702e8e838a50de86bec0590345fd7936eb69c0ea65d036a2b63c470ff12db1e5c5984aecc2aebdcad0303036cc8f3c8c888354e191cb5a506ea27d8fe9cde68c0d6ebc770b7b14d7851c660145e96eac6c7e8d69951d9a345e48a10149756e1b97a8d8843a88dfaf6eddbd2d6f433ad0248b3733e79
    aa41dda32e3c7df60c0d75e4cd468f96ce7e18354fd1ddde2014ad1c576cd2d87b7bcf8c32f6026875a16674ad64682f8034a6bf5a28a95360ebf969881796690e0a4db2008efdbd638785a37f96e29500ea7a2a9014b51fef2f5f81d49d5b1016b292c57b03b94b51ba4c21cdd7d2dee191af534f9856017c366ac0dd0121
    23bb6ea2eb511d1a9a3ad0defd8c5503f4778aae953a5b6ad1d0d68dde21d7678f292929713ad3b42bb04fb002cdf090d761e4a3b16ca984329bfc18dafbbc76862c8017b2b2316830636bd2251cba70074bc2e3d07aaf108be72d60fb3dc15e00a79b691340b9229a5a3e221205fb4d3fc02aa5c9630969b5a1a7ea9acd55
    d43ec1d445cb55c1b4174086b646b0111a91764f34f82316bfc91cb253057566e842bcffd636569d1415be90ed274ca7c51749c65cd5cf34abec3c7352668f996079e0bc40e14f1b306804d01ef6e0c8afa5b613f1f199d689be9de1c93c0a6a904f0f9af14989aa00fa01caec519599a10833cd37460dfd76c802a87fd681
    a4bdfb5176a79d6dfb82a015c0c5247c0e70240c376edc106cac5336a54fb5e04ae74afb7b9a4e0154a2f45baf44fb46beb4362180c97b62b072cb1eacd99e8693d11bb06c5d18ca6e7af75252c12e2805d015c8f9981212406a9fb447f65c2433f2b143d29a6302450065a85d74bc53ddeffff34f4e9e0a6eae10d0022823
    df2009a01ae4b9aee3fcd49f70258126804a8cc975d29a88d206a4e1ab292929d8b6e520728e6dc7bc450760d1f640d75d89555b762166eb662cff2004b1bb0f6057c245768c31b3892d09fdc68973514d01f9fba5a00f2d8731ee01f3074ceb14475f135a376535b37863ba3819107536a178c2b07fa22383dc0985e6d219
    1f165dc6ea975cb57add57635608a00cf59c359bcdaa213f3f1f43ff2d9ed513aaedb70f745f4a02490095d03c14fe2c84cc34b34a009d2197829fffd7b849c2e50a812a808452008d4623929292b0654b2cf23376e38325b1100e3722efcc016c8fdd86e4f3a21fd4b4dc6c1c385686fda9e5080d0985aea712eba2275a5a
    74bf11bd82cb9a8c062691077436a3abde0ccbfda7a2f693b4276944599392a6240fe9dab7c4d628ea8647c7e9d7dc60e7a099c49866ad1bb49edf1133268054b94b3d613a858bd3924dd8e206f40309d96d7cf507e9ec9341db2cbebc1b3a41fd13946132f271962661a91861365b0470ae31831a508ba815ebf1ce1ad1a3
    7065570deb592cf740ceac71fca0d4da7a95f580b290b9431008a03cf10485d07547f1e17bab6ce25adb6c27aa287cf0082b17fe16a1a16158b072351e4bf1be6c279e739f604f096401a4eeeb3b4b07e664787bff152e8044200b60b0e233016c6a6ac2f321b1c69d2ded83541bef4df0850052750e3b9f9fee91021740d7
    f1890072389ec2059033a3cc0a01fcca5ffe0d0bfb0fd98e68e3cc7e7c2e8064ff504b853b1ea21a1bc5e61f19d98692cf410e7f5efcf3af636fccd4edbf9e40d751b3dba842d81decef5b468e8f8b13db7bedf7d3b67d9c1a8eee93e2ecefd53e4f95b8722d6fe9fdd53169cd39fc13ccf109ef9e7f059ae377305afa1168
    aebb2e565c0055a079c338cea1a90b6fdd9c182373e6cc19a4a5a561fdba75282a2ab25664efd9bd1b3131316c9dc6029db4f392c105d04f9c3a754a5ae338830b206746e102c89951b8007266142e809c19850b206746e102c89951b8007266142e809c19850b206746e102c89951b8007266142e809c19c56d01a489a5e5
    f0ce3bef48b1ce71c52b162738f14800dd850b20c7113e11401ac84c53351134d5fe97bef4259b74b200bef0c20b2c9e9cef102b57aeb4a6fbec673fcbd67b7a7ad8b6721f67eee29100ca41e657bffa15222323d93a09a08c9c8604f0ecd9b36c9d2041247ef0831fb0a592cf7ffef36ca9b68f33f7f04800ed510aa42301
    a4deb03272fcb265cbd8520d67fb387307b705f095575eb109f3e7cf97f6004b972e6502489f51fa0ccb50f76d222727075ffef297d93a71e0c084c77afa8c7fe6339f91b66cf771e62e6e0be0542835208733153e17400ec71db8007266142e80018ca56d18da9fe4b23948b4af9d87e96c2b940e37ed319774314fa6947e
    3a66c1f4053e11c067cf9eb1f9c8fc1968b23d6f47f4d7d4d4a89edb978126cef10472874b82634c6d90627c88c1c226d1315f999ec909ddc12702486ecfc87d86bf839a5b0a572117722b42c354cfebcbe08e0bb9d13f4d86e9a4edece8d301cd7537fe6454da9a597c2a80093b4291b1630b2e65c6e1571bf64e7a38de06
    df0ae0cf10fadb97f14f7ff332deffc51b8a78efc25402a8f9441cc687dc9ceed24fd07de87eeb9dcf456fe11ad0c7414d000d5b6fc398f850da0a40844f34397f9f097c2680d381b70238dd6e8469264d57a07bebebeb9bf130b0e4b26abcb781bcc63ac2a702a8767165204c67ec8c74e1eda307c06694b4389ff7d71702
    68329b99c1af06d945c51577d1d0d0e0f0fed9bd3a8104d09569c494906b3572e61d28e81788b321f90a676689cf05302e3903d7efdfc4f60379387fbf0b7d9d77b121a1c0fa0049d597dfbb81da11e07052299ac5d99e70fef03e9bf662357ca7017b5053518a07572fe3f08902e15e7a909a3431c18b2c80c752b3b0615d
    24b2efb459ef9fee813cdaab418237950da80609606409fdf671e45c6f407ff375241f3d848b9907b1233211850d0328ac69c6b3c1169c893d823f449dc2a32a718a2e7f214f3deb298383832c10d32a80ce0261d855c596f69cbf908f9c7339d2963ad3f50976a6011f3e7cc8aa7394683e3e31d1a0770228dca7457d32c3
    9960f4ab69d29afbc8d3a511d32680dea29c4e5f8d40b2012d0f07555f264f05f0f2bf15c0b0fd8e1413388c7e33535af39c5921809636e19b3c05be10c0311f64a8f17883c397c553016cfd54e0fabf566a7819fafd0f1e3c406d6dad35d86fcb4cbb000ee881acca2e14d48fa04b58bfdaaa67eb05752388883d8a96aa52
    644585b0b4fa455759dd982bf85203d6646e435ec402ac094b4397b6894dcf0f3463505bc3a6e92fecd4da4c2bb634249aa5c98e7c5b3c81033c15c08b296285b437bfd19f8c7d5b9c20518604b0adad8d3dfbc56fbfcdbad3d136f58c5fffad6fb16d198f05506dbe3619e53eba09535a032b608c0f88ddedfd41207d821d
    e1a900920d587d3a063b77ec9162a787a4e49bb8d6d081e3458f101919834d9159a8b9a76ea72b91059004ad5d08b200d2b2b1a5c5770268ca6f87eeedcb6c42629aac589e9572ec4739b0d43f63ebb206bcf2b09fdd5854c87ba86a19404e569655d3f9025f0a6052d876a1a8d688b47b54526b66dba4114bb2a934ec79f3
    9827024879460278adac12b7ab6afc12b24ee74957b3a5e7330755d34f153a8fdf61f7ed2c0cfdb15892f658005d45f909a60bfb8bb9ae01cb6edcc29e952bb17b2f39f53663cfbefd488d3d82f5078bc4841e303c3c8cc2c2425c17ce4d505d2b95e229d03a5d53d77b134be62d4171663cbafb6e0ba9cc885ab1119b632e
    63f5d2f908df138d5ffee82de81f97e1f8fe83880e5fcdce3515746ec26301341c10ab1bf4e195b03c1a1672cac296f2a4c64a0d48b5fe247cba5f5d627104d94eefafdc834ab13ac86b7c2980746fb9d9623503cd65ec2bdc1540dd02e1aba210c0e6e61669cf04a3434330b3fa6fe715f56a8c8c8c3021940590aa463ada
    c54f25ad2baf393a225601f5f7f8a6478ed702c870d2ff4c46a901fd892f04d0d5028f33b43f745c5fe9ae008e778cd80860c8f295389c7c0109a7aab17ad16f71b6b20d2d1a330e1c4cc4bb0b9762c59e0c6c3f790daece174f03c2a82b9b2c0c2474ed6d4d3602b86cd13c44c61c46c5f13d4cd0e3538f2022e40f426a57
    afa28e6f04d0051c092069195f32d73ec1c6c3a23dad1440a2b1bb0ea5f76a1073ec1a96fffb0f51dbebf9efb617407b28bebeb91d5be3b270fdb238c5bfaf9871016c2c294444443caaf3d3d0e9791e5af18500523da0d2507639b8d834e58e0092f623ec0590306b7dd3366c2f8064f7555757b320db80fe62c605d0d7cc
    250da8fdf9445baebd00ce9bb71629fbc3c565741ceafa47a0efb98198d49b08df9e8bf48c7c1cdde55a614fed13fce449270bb45eb95dbd74ec0a9a4f4db49fab31e302d83958c32a7a8bbac46dfa24af5f92c42a7973b7adc4961df16e15507c298096f6a38249ff0886ca1d829dfb08a325deb79010ee684019a50086ed
    76fe50dd455d00bb58906d407f31e302e86b665a03525776a5e652c31501d47cdab6d94d298057efb5e14e4b3fd2d2d2a5bddee18a0de82f665c0049db1535d7b00a5f59d355268521aaa80499a1efb04a606d67215e5b188e9ac126963e2a9c9ac4d4996901d42fbb86d1af1c97b6d4994a00cd45a21327254a010cd91c8f
    dc43d188493e8103ab5648293c47cd06940750cd291bd0f2609035c5d987b1a36249cf5ba805464d00e52641737127c69f3a6e069405900a146af73955187be58c742611538658176a8f2b1ad01eb54288af50fb0453154c6bfb44358cbf985601a48764ea142bae47ca273c61d18f1cfc1f4770fcf8719611724745476168
    68483a52143ac37ef19cb4ae397adfba2e57829100eac32a98001a921eb2fb60ebc25289bd06ac4c5a8288a83441ad76222a2282ad6b9bdd33c84998ed7196d986cdea0f5b2980daee1b58fb9b0f70e4a4709e71f72b9eed712480cd6ded734f00c785cf286131091a6244076d552253f35dbf380d8d46630df9f9f96c4e5e
    659c1c46471d0f170cc452f078f3738c0f4bddba051c65b6e69387a5b5c92805b0adbb0f05a557d0f47848b8df5e54961442d75b89aad222dc7ed08dd6fa0728a9105f445720e1a3cfad23419b330248c2e3099441252525d2d604c6943ae83754c2107b1fda5773a15f7703a3c71e40277d72696c8961afd88446de000cdb
    6fc3985cc7966ad80be060a3ed3523defa96b4e618358d27238f0351cbeca9ea10fdf909a666381a14a46c0bbe75eb160b73ae1e7069490ffafbfbd1faa80d2d9dfdace5f2a9460fea984dde13fa3b5bd0d42a08817e98a5b7a7a5a585b970b362547c824c962935e0b8d6b1e784c91a50cb7abe94340ea2f37e1e5b4fcbaf
    6695e68e18ef13afaffb75015bda433d9aed33db950a6ca500a6ecde86f88c3bd8b465138e46c560cf6eefc666d80b207d76bbbabb5998539f6025172f7a3f6086043933d3b66ece179f60ea3441e682bb41f77eb1742611cde793a4355b28b3b53f38c7d647bfee5a558acd27b86ec2761dd0d3ab2b8eabf094a012c09fa7
    89b6c9485d01d2d3d3d1d1d480ba475d7836668671ec191a5a3ad1d6dc206ac2b66e0ce95c33b2c9a7349d6f6c6c4c8a711f7b0da8191ef23e085afd796e2d5b9761993d66726b408f52002fc46d46f3c32b888dc961cb791f7c887f7ae3430c8bdd61dcc65e00ed99530268cf651f376e93062441226174571b4efe04fb0e
    a56df8ec4f6c7bdb98b2a6eedcaa14408b79144bffed9f70e6c05ea4e6df9352784e500920f5882642d645208b7a436715e08250e2250d383cf814834f27348527a8091d7da67b7b7ba52dc7d80b20f5802eea6a6615e134eea3462b8e07610c366250f82b8c0e6195e3f34223c47807902b347dc875c108b4a866b6b3c20b
    319d85107be694003a8332c25ba6fa045301a6a949bd82d89f1a50c9d0a7d4fb1bd2a83f65758d12a500ea7b6e61f7ce2844ee8a4587cebbfe7844500be0bab078ac78e5bbc82e6964dbc5c5b686bc3df4207c0555ef28992e01a4cca6917e8e501be2a814c0850bdf936285f841ef5b91b806b483ec3747c802f87cc7df60
    28e11dc180120a2af931d03df1eed34d4ca700ca38abae51a214c05bb7eee0497f2f6edebc2514d2b8067409770490c8cb536ff2a20761a9ea57ad065106ea14e02e33218084a3ea1a42eedaaf14402269cf01446dd980ed1bb6216ad55216e7292480ddddddc129809dd5f948cbcc46447cb6143301658a3df42048c07a96
    fd8d1423d87d5565305486b1fe7a869bdb60f2b02a70a6049061b2c07c55fddaa35f3b6115c031a190d5d3dbef97d03ff054baa22dd371cd80d3804a94255b7a10c623132e1d64c83734559a7ac38c0aa084a3d230fdeee29d52097c0e32731ab0ab131583540fd6cc7a40534f68d105862d376edc604b7a10f650354873ce
    650cfff10184fcc377d1e8e110cf401040c272bb8f55d72891352009e8d1a347a558e1e5f4b0f2d911cebaab4d85332f195311d01a50262323435500098aeffdc559afbce4078a00ca683e9320ad4d0820210be0859c2be8d69ab0684334d6a6e4e3546e3a2296aec7eef52b30effd5508df1e87c2d3292c2d419e2b0c5b6e
    411f5a0e4be3100b4af42bcba435e125b8ff14fa8d9518d708f9ad37c310738f39ed345fedb2767f631d3c7656c1982ed660c80248f1749cdc058e90c7893b62e60470b082f57cce6dd2a246f8d2923673c69933b69d3e89a8082ab03433e1ebf9addc5141d0aa5aa967b1bc9c8240134042bf442c4c2905702e322b34a00c
    d97a8e42435d03ab5250dba7169404a200ca8cfdfa1217406f702c805ac4c767322d9596168ff8b085acf7b1a7504b08d949244cee12c802481af0d17f15072a296dc031937736a0fd67d81d9cd97cf2a79750ae3b62566940675089997c9dc8b3aabb43a00ba0ac0193924433e5c2d98be8d60936e0c603589772098fbb1e
    e354e14d6c59bc0cbaee4a2c58ba063bd686a2e371393a3acab166db6e6c5a128a558b43d9f1846c0bcaf61e3505cac315f4d2f000b2ffc89e93215b925076a220af68049d838ea57318331a61d85dcdd6e9fcce983101accecfb559ba0abd7df44395581e3c6502483fd8dcefb8dbbea33777b608e05c64c604905c7390e7
    a97bd2920a22ae200b2079e792df387a9365011c7fa6c7f8a06d95826e892878ec58e9384bfb307b4b092e8033c78c09a0af51eb8ee52ac120808b4f899e499d05ad6057ca9e4cedc3e3c78fadebf685386f98310164ae38c29258e5331b982e1446c8550755487b822c806a9f59479f5e99e013c0c768adbd88b68e4e459c
    ad00767676a0bdbe02e17bcfa17fa017ebc2365bd3cd0901f41436ee57aa18652539c947e1e866d158d6fd66a2a735559c92914c46b36c2cab110c02f8b7d18d08c96e711a4800694a5912426721a805d01173f913fcb3940e365dd75c0ce422d8115c007d8c270248180c86391b9c35a17201f4319e0a60b0c205d0c77001
    740f9f0920f974a176dae7432a81e27d10bc15401ab064bd1ffb7b94e3bd0c5c00ddc32702a8d7eb556797f475205f26de40de16d4ceebcb4042c8711d9f082087e3295c0039330a1740ce8cc2059033a304bc00ee3f148faffce5dfb0c0997bf84400172f5ecc96541aa666255a52484e4e66fb76eddac5f613b27b0eaa1d
    8f8c8c64ce85689dd26ddcb89155e7ecdebd9ba5c9cdcd45d4fe43f8d397fe12ffe37ffe1f16f79bdffc862d5f7df5555cbd7a151b366c407878388b4b481007fad85f574e4771747d3a877c3d82ee953cbccad75db76e1dce9d137dfc858585b1fb2428fdd2a54b59b513fd4e79fbe1c387d6df4e3436368aedbbc27172fc
    a953a7f0c1071fb0fd274f9e6481f6cb7132740fab56ad62bf49fe5df47be8fe68494e9fe8de2b2b2bb160c102965ff2bdae59b386dddb962d5bb073e74ef65b69b0970ce51941d7a673444444587f1b9dabbebe9ee513dd93f299b98c0783c6fcaa01e57a3b5746b339aae3db1b1d8b2ffcf9d7f185975e9662c0329dce29
    3f707becaf2ba7535ec3d93d29cfebcabdbb8aa3fbb5bf06dd27c5c9f1cafba6caf4a9ee89aea3bc16bd1084fd71cecee3e85ea7c270579c95a8e3a5ad6c3915dc06e4f88c0505cbb1e8efa2307acd75b1e202c8f18a4b97c4f9a1dfbbf08fd0b4ff27b6feeac9afb2e5bd7b533bd8e402c8f10a5900d5e002e806d46d682a
    686e138ec88df272e6e58c0490ec45eace4f50818f0a8f1142018d04909a27890d42616ea754e05112b40248b33211720691a12fc71134c3106d5366521775422980b2b7564a2743e790d3d0643c731d9a6b8404306aef5e2946a4b4a4841570eedf179dd66fdfb68d2dd5e01a9033a37001e4cc285c0039330a17400e8713
    b47005c8e1708216ae00391c4ed0c2152087c3095ab802e47038410b57801c0e2768e10a90c3e1042d5c0172389ca0852b400e8713b47005c8e17082966951806af3ef501818f0ddb47c1ff9c8476c46e672381cce544c8b0224e5e46fb802e47038eec2152087c3095a024601926b65391d2d878686d83af1faebafe3e31f
    ff387a7a7aa418e0dd77dfc5473ffa51696bb202a46df20e2643ebcafba0732ab7653ef5a94f61ebd6098fb2c3c3c32e1dc7e170661fd3f226bbaa30f6eddb87175e7801515151528c08291df2f96e8ff2bcb42e2bc0eddbb7e3e59727dc98cb7ce52b5fc19e3d7bd83a9d73d9b2656c5d099de795575e99148e1f3fcef63b
    3a8ec3e1cc3ea64d01a6a4a4a806194a235b78172e5cb0516ea4745e7bed357cfdeb5f67ee49656b4ea988685b6901525ab2e61e3c78c002ad539c8c2345b677ef5ea684e918e2d0a14393ee852b400e676e302d0ad05bb8d2e17038fe802b400e8713b4cc0a05c8e17038fe802b400ec75f982cb03c1c84e96c2b0c7baa61
    88b809dd3b8562f8cd658cbd7206da37f227e28440694c29f530977461bc6d443a11c75f0494021c1f1f87d96c66738acdf660b158a45f3533f0bcf42da693cdd0fe1007231f3980d13f4b817e6519cc579f487ba79f718d11a6cc2668bf7f96ddd3d8774ec194d620ede5b84ac028407a6169785c4141016b059eeda1a8a8
    c86656fde984e7a57b8c0f1ba05f74952912ed4f7261b92d4e963adbb1343fc7d8df9f86e6938761ca6e9162394a024a013e7af4082b42c3f085975e9ef5e1ca952b33aa00795e4ec698f810231f3b8431c16a1aef08dee2a5e9540b465e380843f4d473d7cf75025a015ebb7e057f272c33766c11b67fc6e2427ffb327eb5
    612f92b372d9f6defde232d042a029c060cacbf13e2d46bf7602a35f4d635610676a465f4e677590c106b700fd14b805e8bbe0342f7566e1e5cd80f607e758a303c77b2c6dc3ac3ac0d2a99162e62e01a7009f3cf14fc5b2e9423b6b61530d9b6fb117494c688161ebed4969a835cf1d024101dae7a5f1d08349bfcb5930ee
    af918e9c59947969ca68622fa7b97c625cb8afa006979a9a1a9c3e7d1a274f9ee44108a732b230fc470790732453757fa08453a74ee1c68d1bd0e974d2d3748d8055807d7d7d527888b8e40cc5b66da8eb6c538da7409cccbfca5e6622f672adf0bf06b552f54f5975bbb822402f95bca456c7a2b4245c494dc0f555bf65f1
    f2395c25d014a0f8fb7a907a32578c50a1cf30f98b2fe70bd1d0d060cddbddd965c2b20dd71f89dbe78babadfbe440d0bdd4d6d6b2a1856565652cce1da89eeaf97f8985b6cdbd0f9027188d4654565622b244f453393ceca49e705cfa602a18191996d626a3d319a5b5d98ba5fe19465f3c2a6dcd1c0683c16649fc6eff65
    8fdeb959a0004505979d9e2128bb3e94d6b4a1b2f8125b9703c59192b45794845201f609f94522da27645cdee50adc111420c551502ac0fccb252829bc8292a222a49dcc61f17343018a0aee4a6e2efbcd355d1a3456dfb0e6811c474a5256948e1420e57b0b5b76213dbb00858202949f8732ff9b9b9bd1dadacac2fdfbf7
    599c33cc15bdac825e5977375d79a954808fae1cc2e040339e8cd4423f740f9df77311b37e13366e4ec48d4e3d4a5aeee24e66129ef7dc41df20792e1a4779971e07d68663c3c6a358306f154e47acc085982d8808398a889589b8d2388453371f413ffa1c99779f89179da5683e9788f141f7ac2d5fd1dfdfcfe4bb4f58ca
    cc3905e86b349f8a672fb3a3202b3863ec7dd5fd63dfc860fb5d25d014e078a746f5774d15e8abef6fa8025e1f725dda9acc742bc03d718decb773a666ecbbd9d3222353c115a08f319d6864dd263c259014e078cf1846bf721ca35f3a36a3c19820e6a7ac5cc75d6ca19d6e05b833ac1a9656c7c559ce64e8f952e76c57b0
    3c7c06cda78f58e5c0d330f6f57456674fcc7905b83c3c0aa72abaa42da0cb41f54c694e16b6c7a64a5b40655614849209fefddfdf1323ba2ac5a503f4ef17b39efede12280a70f4cb137921931741be159bd1585288a8b47c54e7a761fd922444444460c52bdf05b49dc82e696469888a4108fbe251949d8bea4e2da28474
    f6c72ae33aabf3d138281c249d87ce2b4382eb2ed3ad0047fee7312986e32e9a8fc7496b8e9165803aeb937b3b0a6b972d43634b8b75fbd6ad5b36fb8fa7a4a0fdf163ebf6cd9b62894d3ed78c284053bed8b26a79e4ded7d21035e1b78ffa6cb1e5140ab0a2b60b595905c8c9cac280a0d0b20a2a84ed2c740d0c40d844ad
    a0115b6887002d691fd1555b81da8a025414e4b0b896d656b65d552ad6edf98b405180f4a57584a8085d87149db704ba021cfa4cbcb5110416034237efc0cec8bde2f61c25f968197a7a06b039221c3773f271afa014dbd7ae45656101720bafe29ffff55decdb1c81818632649737494739862c7d7351a7b435197b05f858
    506cb97ff44758fbfdef5b159c5201d2f227c2bef04d9b58da805180fac557618c131d871a8f37081166e8d7dc60dbe38fc50a77edbf5d10e3147db4746f5f96d684745245aafcd2b66fb90253ce231627e3c94b33d304b402142c33a5552642adac524babb47fb282f4be25369015a06e5f356e96de985080c182c1c21c30
    f83a683e7344359e64c054f0d8da38a61648e929b7499eedb7091ae647044c11585688ae30fe64545a9b78691fcd3f2bc500af1f2847d7e018cbb0c4827a8484ecc07b0b76b0e93443a2b2847012058557901515225875a71048839b025a010a9082a3a26a51793584522d0b258d832cc8fba9484b212d4a48ab15e3e5fd9e
    12b00a5050026361e536dd60ca6edc62cbcc52d1c940d4d17218fbc8f21847716d3f2e9789e36b2b8a27e69e990968de9ae7cf9f5bc375e9be5d819e07fdcef22bc5303e6f956285f798fd4e621c2356db651c2b57ad8276720f202b13c74d70af62721c4156a229af4dda721ff9f91033a6008dc975ccda1bef1d93626c21
    2bd119f27eab02fcf01c1346259ebc34334da02bc099225015e0d8f7b26dbac110f482353ea883c5fc1c774acea2b6a90fa927b3853de318338fe3a6b01d9f7006cf3beea0fec62594d5f9be73b62b90028c8b8b637d2d474646262940f20a24171de540db142f2bc0715d1f8ea45fc4efdf09c573e1f54b3d791a25671371
    bf690019f9d785f3c70b671ac761e13a046dbffbae9896d66b9bfbadf9d3587109d7aa6a60d6f6b3f582ebb5484f8847fded623448555e32ee762f5332f30a506b62c55e82ea012d2dcf31de350a4ba338a31b2d49c1c9dbba259395a1bd027454073819adb5885639a8c5c1dc2661c93603824051806add7726f24d0af78b
    90bb6d0dabe3f3771e06a202943f126a0af0f4f648b6fefbdf2dc7eebc06ac5d345f585f869da7afe0d09ef5885cb41a87736bd1559686f36931389a72005b567f880f4222b0615b1cf28e4762e9c628dca9c8c4a5d4748446c6086ac4b7d05c38555555d6a0540c8452015e493f80aa47ed9314e0895d7bd0f5a819c5a7e3
    b0ff7406e2b68560d307bf43f8fcdfc1326e41edb011869e0a162fa729be5d8bf83cf73bb72b99dd0ad087b8af00039b40518032c6e87b4cd8663250771c4ff0675e927718193505e88c618dd8e836d3b8a2009b9a9ad0d8d8680db4ad54808e100c5dbf4272e12941ad00e78546e0cd57fe85592dd43583964b17c7635d78
    14729bb418f44185bd37049a029ccdf82b2f95ca8f505380f5794231f05e0dd6ad8ac296980338baef20b66fdb8d7bc559d879e0086a1ed4226dd3566c088d42f733cf14bcb74ca5009d212bc0c41d3b505b5b8ff6f66b38161d834b421176fb8ebde8a6529e1fe10a5082bfb4be439997acb3e80ca07dedbcb4e63dfec84b
    b9f550899a021c787019479392d1d3d981a1be76e8058ba8e67e03a2d78761a8b71d3a61fbc8860f60e8af42ced158441e3a017d77198e46ed426f57079ef73f86493f8c51b316edbd43687950837dc2b1be34acdc29023baa039c09a811d47870eae1918e086a0548755582a107eaa04b9d718bf2275a33298e5a2e59a75e
    01b20e576ecb9dd481971a34e3e3a3302f9a2ab67d4ba02840b53a37c3cd6d6c69323d82b63206e6aeeb30b59d05353dd1f6f3ccf96cbf3778f365b7c7a77969b240fbfa0569c316778bc0aef220ff186b34f117ae2ac0e28c83acfe8f2ddb3a583cd1f9c1052627d319c85723c6bcb32e835a01dae36a275d773bff7a4a20
    2b407b34a593ad216f09440568aee881297ba2ab873d6a0a30253a16266d13def8d1afb129be187d4f6f63e592f9d818adae44670257142039b2a8afafb706da9615a0af14fd7413d40a902c405ba5270edb22c80a94f9e5dfbe860f36085f1ba74c1cab2457b02a3d255014a0e5eec0a4afafdfc30b07a1f9449c759be6dc
    f0065fe4e5e84b938704daa3a60007bb9a85b8c972306e9a99fa3e35bca90324b8020c00dc558054c4a59fba213a8a6d47a5a5593bf646c467b3e22e114f1d7e858454e42d69ac641d7cd94807218d5c64a663ede3281d15abe93c25d9f1d626151afec796a71d4f3263cc6874eb61e816954a6b22e6ca5eb61c7fe6592ba3
    b7d6b43f2087b4acd1c1e27e51d05b05a8f94c82b4e61c3505783a6a1d962cdd8833bbb7a3f75e0e96471c44bfde8cbee1016cdab811a74aeb58da99c49b3a40822bc00040f9d28e7df7b414eb1a833975a8fc75228e1f3f8e8e6a1ac4ef3fc6fef10c1beda27bb3802df5cb156e9c4c16e85797b3f87b4bb230ba44a1d8a4
    7d72bf479362ac24c5518772c2b0bb1ae6e24ee66288fa55523cf5a3341574c098400e5d6d8f55c3262fbf7d528a9d5e68be5b4790c76d771c4e78aa00c9b185c58db975d51460f2ceed28ce4d44cea5db58b06227fee19f7f85903f2cc0a5f4145c2f4c4169c671967626715501b63fba83d8ac12ae001504a40294eb8f34
    d17fc796c4e8fd2a8c9ef97b5659af7b3204836092694b96b27de406dba608e68740c3efe81eed311ca8618acd1e7a189abdb755f7f91b655ed2bddb5399b404116f7d0b4b7efc45ccfbde9f609bb08ec14e7cf18b3fb6c67febad6d483aeeb9571457eb00a94182cde7e10477057b7c488f510f5abfdd6e04b1987ddea9d9
    135c51800f1f3e9c14b8020c5005a8f97c127b815c0d3ae14b6f3856cf7ebc5e3f75b1911e3ccd1f909e9e8e8a8a0aab20788b6cdd11f4304677bb2758cae389f1a79e79dc9d4a014e07f45ccc058f61d853cd261177056a19544beb8e607bf37bd514a071e0368e1f8c47dafe03786ab660fde6ed485a13861ec1a2dfb13b
    1669070ea2db60c113ad09ebdffd29fee5edb5681f1b4752e47eecdab51786ce321c48bf837d47f2b0f1bd75ecbcbec69bb1c00457800180f2a595b74941d14435c4e098195d8f1af0744883c1e151688d16e61abba1a11dfd4f69a89d1ea4c69e0a7116b31e16a316a3c3836c9f5623049d86ed9b0a9abf82ae7be9d22526
    58f6589ac4617dfa50c9b2933a8ab2e2f0d26b6c9d68fe87a3188da952750ec18ad02ac30275ef5cb1892705a8966e2aa652806f7deb4fd8f2c51f2dc65785109a5983a8a26654deccc360532eb3025f7cf165fcc9b7de122cc108ebba3b9002a4be80e4d987eec1e2e63cbce4c19b2640225c116c6a78f11635055896be0b
    bd26d1cecbbe5ccf96f624ee8e96d66686a914207de0791da03a01dd083224f5132a2a2a62b375cd24243034f314055a9f0a4f1e86af50e6e5d83732a5d8e945f7eee439662db7fb444565e7ecc229820c90021dbba3d2a023ec73c501a7aba829c0ceba2ab43cee426fd7133cbc7d05d70b2ea2a3f309dbeeedeac6a5fc7c
    411e261cf5ce04ae28c08eb62ac466954af580a55c014a04b402342b5a0c77ecd88ecb959d5647a753d1df69db4acbac41bb385f40c247d622598de48d4326501460a0424e335d6d9d95f372bc559caf967c4c52438aaf51538047b72ec6b020878967f2917e700356856dc3f5e2e3c83d9a8ab4dddbf0f6dbab109b968f13
    c2beb52b372264fd063c911c844c17ae28409a90ca3e700518e00a70ddb909efb3e4ea5ef6f4dc5255cae6026d6b69c2d3c161562c1ed268599198ea00e5e2af58f4d5e2e9d3a7d08f0eb338162f149f470521a5a5bf282828c0f5ebd79962a4fa46b9283f1dcc0605a844bfa0944d6eee08126ccd2f2ed80caf335decf0b8
    5b8d23dc6e040910a6528053c1156000e0e94b4b56d7e5cb131ea60305670f43ae67bc78f12213585f33655e0ed23c1da1d2860adac9dd6cc8f98423a8c338f59df405d4054af7eb02e87e73199acf26627c4037a5601bb6dff1c93c2e6a0a3061f37a54deb98e93a7b3716adb469cda1a81f06561b875238fa50904b8029c
    a30a50f6084d2c7ceb2ddccd8945dd0870b5558f829b379907e88d3b76b2657987992915b3ee39f4c3fdcceaeb1f9e3977459e3c8ccece4e9c3e7d9a59b75451ed29ae7c4c588770a97b775442a49d77e84164c74720bf7ac2753e8b97d2a4656633259926283eea2c4e41ee7c2e761a1f6463ae29deca9809865d5518fbc1
    393683181565696ed9b1bfce625326581e3c95124e40bd01c88d973b79c9bad5fcd0b3f95ed41420357098469fe0feed1b78dc5a81e67b37d1d0d28e92aa465ccc3e05bdff0a112ec31560105b806ae4e7e7339f67de42f74402d5ddddcdeecb9d90919181969616d57dee06f2dd969b9bcb143c4d0643938e3bebeee3cbbc
    0c04ae5cba8c918fc6c25ce25e63c3e8d74eb8d50fd3dd22f0bad0505f96c03d862bc020548034163836bb11858269420e0e3243175ae365a84e902c2a4fa11782eaefec193af47d0c9f795bda0274cdcea7daf407cef269ce29408560d3245a1e77abc9521ff32da3a600537789432dd76dde85c4151bb077d75eac5eb104
    7b8e5e85a12f3014075780dc029c92cccc4c6834e24c75aee24801ea2a63a06f7b0063733ab475a56c9bdc4899463cebb8ec09c1aa009578d3adc6f240f1a5947064011e4f9b1855d2d43eb9a83ed39002fcf0c30f919898a83a27c85470051800b8fbd2a66d9bc72af3df5d92c4ea9c3243dfc16b0bc3a5bd8ea1f946af5d
    9be8b0ec0c590152a75e6718efefc368e926182a77b06d83a01c9558140dc0f4f2f902ae006d3126d5b9dcad4686c609d3f390bdd5a82940b36e084b972dc6933bf908df9982031b1762f9f2a5e8aabb8afff7f53f60f5a2a5b87cf2302edf9bb9be804aeb8f5b80dc027409aa43a33a3567b8aa00a16d65c560722c4acbb1
    b21c66110a8565b6adbd7f494c27c015a0fbb82bd8fa25d754278372060ddb1bf9f82154de9850809cd943d029c00aa90423babd1a644b792e5bf2f84cbe02298e7985d67622bbc471a3484e4e0e6b81b5475904a6ae16a4081d05fdc64ab4875c40cf47f6e0e19b69185c5322c44d4ea79c20de1bb802740dd6ade637ae75
    93922dc0936f15fba45bcd74e0c95049826671f41756599f46b80528e18dc7671a1e44ca5046a9009d41ca967ad55ffc9b65d8f5f7e118facc010c0f572377a3782f99359ebdbccee00ad07de46e358eb02f02cb1c3d7a14f7eeddc3faf5ebd97ad1be44e68168cdfa6568284bc7ea7d27d05c5f801ba7c9ab8d053dbd77b0
    fcfdb77168cd5284461e44e6de75a8b85981957b4fe0fb3f791b0bde5f8a8c7d5b84a2732262b315eed404748b26a69165736debcdcc159ae94cab35ded23cd177547698a1dc47aed4d85cdd0a671a726bb8f25c4a576b740c73d92639e4a0787d5885adbb37091a89a35f57216498f831b74f23bb8c93612377b6dd865e50
    8a4ab76fb27b37828d7b57fc7677093a0528b7e791c5e70857dde4db43f742c5636a347145012aa163a90f2215756949dbfe802b402fb08cb35124e6abb6f9e3480172029fa05380e2b497c2ff8d25ac88abf4e6dc2964427c52a66d475c0fb0582c28292961e326c9027027c4c4c460f093b16c944a7575b56a1a4f03cde9
    e0ac459b2b40d791bbd58c776ab8029cc5f0227080410fe3d9b367e87be30cda2fd7f0b1c05ee04f05a8c450f104232f1cc0dec23e2926b0f1673d9e3f90a77a2094f7ae8cf7942054805ae46e5bc9d6a8f3337588567686a6d0d9d5890f97adb076969e4ee487418aef71d61d3cf9c379979cb5fa02ae003d436901525d95
    dcad86eafd68040e35b2d17ae98104e8f446ac0b5f8dfbc52908d99d8c86da0bb89e254eafba7fff36f4d4e6e260c619acd91a86e8554b90577909ab17fc4ed83b8eb22e0d0c63dd58f2fe522cf8ed07d8bcfc7758f03b61b9ecb7b890ba1b274bc4b4312b17236cff292c5eb2999d5709d5d529ebfde4ba3dc2be9ecd78e8
    be4d7d9f72748cb5ee2fac428a1110b6e573dbd4cb513ae158a5e35e564fa9983cdda6beef8858c7470d2234cd8375aa877b03d673d2f9285e79ff9ec02dc00043f930a828dddfdb87fed6276cdddf7005e819bc08ec3ee6f26e696d66093a0548161e5975bf7c3d0c0b4333317f8df095556cdf93ac405f227ff9e88bc64c
    78e1cb4771f475a52f9e6e4129fbb2d1bec2bc028c7e5864b3cf445fc1ab5dd087570a27137db119339b60d82efab633c4de675f41d3c96618f64ed45f6a5fcd65e71dd71827aeb7e6068c594db0b40d43bfc5b6232b57809ec115e0ec855b80330199fe468b6a9f27528063cf85a28efd3eea3ae04d5f40f958e1dae34f46
    c5753bbf865c017a46a029c04f6f68c09f6c6cf43a682597fe34ff0dfd3e6f83ec483590083a0558dea9659d9ca915b8a47150b0f604734feaf07c88e6f915a03a1bb20a694e60b96334759ba9a9ce8770885f71f430a6a3e29a2b40cf083405b8f8548bcd3c1eca7074f75abcf3bb77b16d7f2e564467a8a6a1d0dad66155
    806d6d6db6fb1f3fc6877ff8107b8fe5a0559097f676daff18adadad7824843d1b36e3b132bd1094aef403096e014e036ce223a9184c4552d651947cd9c995c402f29cbdf430c69e0cc128146b2d5d1a56d14bc7ca69e5ceacf69d48592753e91a046dbb0b57809e319b14e0e38e3634b53c129e731b9a9b1ca773aa00697f
    73234bd3d0d884476dedc2f9da5157578fc6fa7a2643f6e9b902f413fca5f51d3c2f3d83d701ce5eb8020c30b802f41dd3959764d99095545e5e8eb2b2321e6659a00102f4117307ae00fd045780be6326f39233b7e10ad04f7005e83bb802e4f80bae00fd045780be832b408ebf082805483ef9c81d15cd8a369bc3a953a7
    98171972993413f0bce4705c2360142087c3e14c375c0172389ca0852b400e8713b47005c8e1708216ae00391c4ed012500af0fdf7df477272b2b4353534e7465c5c9cb465cbe2c58bd97eea191e1e1e8eab5727c6d77a82b36bed8d89c5175e7a59087fc5c297bff64decdd7f88ed2b2e2e664b25f2bd39233a3a5a5a9bc0
    d93d383b1fdd83da7d28a17bb247ed5a6ae9d4a06900943c78603b5772515191b42662bf5fa6b1519ccd8fae2baf4f07eeca2231d53395b1ffed84a36329de51de387ba6740d579f553013500af0f5d75f477b7bbbb4051c387080093d09c1e0e0201ba2242f098a57bea49456f9c228898a8a92d680cccc4cb6a4f93ee4f4
    ebd6ad63cb23478eb0e5ead5ab6d04ccd9b54801be2828c05ffffe437ceecfbe8217fffcaf8438316d424282758c29416ef2e9de6849b4b4b4a0ababcb7a2e7949d7b25740ceeec1fe7cf6bf43be0fca53823ce5287f1fdd93f218c2fefac43befbcc394837c5d99f9f3e74f4a4fe77ff3cd37d97d2bef9596b4cf7e3f3134
    3464f3dc65940a9096ca67a74c4f1e9b69b9668de8015c294fca7b948f97cf618fbbb248c8f7abcce3a6a626761efb7c97830c1d1b1a1acad6e53e8ff2b1745df22cbe7bf76eebfdd20c75743ca5a140c8324cd03efb7740ed1911cabc54e607ddabbd7caa3d7b7fa22b72fee1f6165e04f601372a6e3285c78260f951b851
    293a39e570389ef185830ff064cc8cabffb81fc3bb8a60196d83ee7a2b86763a9e09d25db802e47038334a7e7ebeb40644de58825d95cbd9fa8987b130568beee5c6878ab0fdfa3cb62e73f7ee5d69cd73b802e4703833caa54b97a4b5091e7f6507b44ddf87ae6ebe1433199a22d65bb8020c32a87e69bac6d59267610e67
    2ad414a02b7005c8f18a8b172f5a8b1f34ee962ac30959415205ff891327d8749ed4b8409063021a634cd01c13dddddd387dfa348b237f7a555555ac0592d2918f3619da26727373d1d0d080828202b6ad3c1f613018d80b4115ed741f54994fe727a82180ae4195f29cd9093d7f9962a9355c56805bb76c614b626464842d
    378485b125715992199211a2b6569c765366cf9e3da8a9a991b644b2b3c5a94a1dc11560104382272b40a560ca0a905a3965a8e59c5a91e998cb972fb33879bf7c2cb94c2705484acb5e018e8d8db1e3341a0d6edfbe8d0b174457ffcaf311e4f480942339b794ef43799ee7cfc5a90438b39364e1434ace3a88ddbb76b1a5
    ac00a9c5597ebef4e125940ab054fa40d38790206547e7239a9b9aacf36ecb1f4cfa109f3d7b96ad3b822b400e8713b47005c8e1708216ae00391c4ed0c2152087c3095ab802e47038410b57801c0e2768e10a90c3e1042d5c0172389ca0852b400e8713b47005c8e1708216ae00391c4ed0c2152087c3095ab802e4703841
    0b57801c0e2768e10a90c3e1042d5c0172389ca0852b400e8713b47005c8e1708216ae00391c4ed0c2152087c3095ab802e47038410b57801c0e2768e10a90c3e1042d5c0172389ca0c5ef0a706060006d6d6daac1570c0d0de1231fe1ba9cc3e1b887dfb5c63befbcc394935af0155c0172381c4f981605f8faebaf4b5bfe
    812b400e87e3095c0172389ca0852b400e8713b4048402fce0830ff0e94f7f5ada023efbd9cf22262646da126e52506ef5f5f56c29875dbb76497bd515e0fbefbf6f939eb69550dca64d9bacfb65f2f2f2ac7114bef39def487b44284eed380e8733fb080805487ce2139fc0e6cd9b111e1e8e2f7de94b52ac08299a6f7ffb
    dbd21660301858dcc3870fd9b6bd02dcba752b3ef9c94f4a5b22b44df132947eddba75d29608b558db2bb56f7ef39b58b46891b4a57e1c87c3999d4c8b0224a5611f222222a41413c8fbec518b2325f4d24b2fb1757b0548eb636363d296086ddba7b1e71bdff806a2a2a2a4ad09a63a8ec3e1cc4efcfe36bb530748ca454d
    c1a8c59d3973061ffde847d9ba9a025463aa341ffbd8c798c5f7ca2baf4c0a328ececde170661f7e7f9b5d558054ec8d8e8ec60f7ff8437ce52b5f91624548e93c79f244da12f9dad7be8677df7d97addb2b405264c78f1f97b6448e1d3bc6e265d4141915757ff0831f485bea7005c8e1cc1da64501925595929232296834
    1a96262e2e0e9ffbdce7d83a414a26393959da12b73ff5a94f2127278729bb5ffce217368ac85e010e0f0fb36d52a8168b852d699be26594e995503cddb34ea7637582d438a32c163b3a8ec3e1cc3efcfe36efd8b143b54849a1a7a78729285a5742ca4719272b9d356bd63085f4f39fff9c6dcb9022b53f07f1eb5fff9a29
    4e5adaa3965e86ea175f7cf1457cfdeb5f47515191142be2ec380e8733bb9815e60cb7ba381c8e3fe00a90c3e1042d5c0172389ca0856b160e8713b47005c8e1708216ae00391c4ed0c2152087e327c6db46602ee98229a51e86889bd0cd2b82ee9d4216c65e39c382bc4d41bfe6068c476a612e780c4bf373c0322e9d89e3
    2fb802e4703cc474b103fa25d730fa95e318f9c80116c6be9909fd8252a6f448f991127497f1213dcc55fd30a537b2f38ffd75d6c4f9bf7d12865d55b0340e49a939de10500a903a459b4ca6591fcc6633c6c767f6ebcdf3d277581e0e42bfb20c9acf243025a47dfd02b3d4c67b6c1d6e4c27a420d93d7d2a1e9a4fc43145
    69699b18e9c4718d80518024ecadadada8aaaac29d3b776675a8a9a9c1b367cfa45f36fdf0bcf40e636a03c65ece60ca4ef741092c354fa53d810d599c63df39c5ee9b8ad33059a43d1c47048c02d46ab56cd8d9850b17667d28282860b3decd94e5c2f3d23d4c398f30fad534664919a3eece19c5414565a6c47f73191833
    49b11c2501a500af5cb9822fbcf4f2ac0f2b42c3f0e8d1a31955803c2f9d60b030cb8e2987f78b599ddb5cc798f890fd5ec3f63b520c87e00ad00f812b40df055fe5e5f8a00eda1f9cc3c8476361dc5f23c5062182f2d7fe2417a35f3a86718d518a0c5e025801be2f2d7fc6961969d9f887657bd9fa9d0ba96c99907d5d4a
    135821f0146090e625bdecbf2ec0c80b07614ca997223932863dd518f9d8a15953c7e90f025a01eedd4f2fa9f4d2eed8828482c76c7dc10fbf879ffde47b08d91187d835bf92d2074e084405184c79698cbe2716f736df926238ce305d686796f17887fb5d76663bbc08ec8710780a70f60657f372fcc92846ff2c0563dfcd
    e615fe1e623c741f9a4f1e0674662966eec315a01f025780be0b53e5a55cb96f3adb2ac570bc45fbd33ce87e7149da9adb049c029c0bd0fc2581a000e7028ef252f7ab4bd0bc7814e3033a29c67b8c46239e3e7d8abebe3e1eda9e60e48f633170ad597d7f8085fefe7ee8f5eeb7e6078702345960d87a9b8dc7540ba63313
    d603d587d8ef77b7d5301015208d12b0ff5d53051a0131d3d8e4a5f01c475fce80f6b5f3d25edf42caefd2a54b3879f2240f52a87a3d116dff3741755f20059a2fa8b3b3d3ed772e201560575797aa96772728bf06544472562f64ca6882f1f0035c0c3909c3be7b2cee5659315b1254bfa4f97c92b4353581a400cf1494b1
    e5e8d74eb0a53bb0fa34818167cfd9522d9f1d858e8e0e760cd1dede2eadb90fcbcb074dccdad3bd5b28c5fa07ba6f7a9938b68c0f1bc477c810981dc40de671360ba427ef5c402a40d2e4f28bb466e51e5436a82bc4cae262141657abeea373c8d0c32b3b798cad6f58b48e2d61b0b56e64ab87283c162b1cdf85c4d57f60
    db041100170924057832ff2a5bd26fdbb8f6001a070c6cdb9ec6ea2adca9b65554727ec8e790f3f642723c5b867e182ac675365af7c9a1a1a1811d4343d94646465058e881f2d299a1f95c22fa3fbc382d7949f72d2b40a35eeb7440884e67db87ce6cd44333e6a0383e3e371a1568b48cb9bc47da9a796499d09be6b802bc
    dbda870deb22117ffa266e36dc652f1cbd841792931175100fcb8534c9672e588fa130590166e2fcdd41140acb9a8a52d48ef430a5989794cad2c80af04cd4160c0d8fb2cc1c1ad6b27dc45c5180d4d3616b44144e1434a16940b0d2840f01e503e5cfe1a452840a694e155eb31e434c5680c9c82869c41961597a290fd71f
    3d64cf23fd80a8182990026c6e6e86c16060d396d2d2652ce3187d29958dd698cebca4fb1615a005d73bc790bb6b3bcec41e41655e2a0a2ede45e4b6ed682abd8ca8943ce177df4144f82654e5a7a34fb08c72b76e600a90d2141795a0a4b008d15bb6c0681cc099e232acfcd13f413fd486b3a5f5d8ba75bb78c15908c984
    fefd89d2d14c10b262050b32735a018a165e17d2b30b5077fb3a8b8b4bcec6ddb23216f24e670896e02594deb889bcb25aeb71f60ab0e3a1b0afa59d2dafe4e60a42ab61eb1408590112a35a03f27efc1718d64c78fb980b0a50b4f084df76b942c88b072c3ef56481351fae15e40a96e00dd4d435e1dac36e870a90f2bdee
    f65db6cc4ecf405d679bf579c869640b90bcb950fd0c3530b8020de667635725664601023b4e54226c7e38362e3f8ab00d47b130241eb71acb7176eb46e46d09c3a615493871b3091fcc8b84ce28fcc6cd61c2512696e679d3255c7b3c8ccb757db8de7e17c6d13ae46cdf8853e1cb31343286d4ade284feb3154b553fc6fe
    feb4b435fd049502f434d82b40a7502389f0b28f6cadc4f8a01e599959282e2ec1b16362b19998ed0a90dc25b98b3eac822ded15a02b415680f7eedd434b4b0bf3ece20c83702d2a62d933530a5049c6811dc8bae3793de65cc4221425c84a0f04e69c02f435c6d8fb4c81390a9a8fc74929c1fcaba9a5b1d4bbee92299014
    a00c791f56fb5dcec2d83732a4a3fd87f9ca63361ccb914382995080e48054698572d4a1b1c4ee340efa0bae00fd00757df1b41b48202ac040c1227b4816ac6e723f450ad019d3ad000b234e40f3e923ec03c0991a7232411eb16712ae00fd80372f40a0294072f944de3f6632c87546a3825539f6bd6ce699c51566c202e4
    cacf3dc63b35cc6a7615f2a82d9732bc09721d3557803e865e58aba5e20181a400c98dfb384db01100505157165e579976059879d2fa62715c871a46f421d7a52dc7d03c27e4b9bab7b717b5b5b5d64075c6caed9e9e1e9bedbaba3a9b6d9af241f7eb0276ce39af002bb3a21015be5cda026a2bc41f3e193d4217bc85aa96
    01691bf8f7b742505790887a499fbdb729515c5181e678a097d37277e2784f08240548eea0eca9144af6eb972421375b6c74884a8bc16063094a1a9b312f3a1b5111112c9ea5d9b612d5f9691814fe58bcb613d9258d484b8b6769e858fbb808215d517e354bdf599d8f46a926813e2a3497863b4cb7027cf07a8ab4c57117
    fdea72582a7aa52d75e48f4b7d7d3deb2c4f81063eacffcfffd9bafdf8f1633c7cf8d0ba4d0d9aabbffd6d9bfdd4bb20682c4052806bd76e47416204b6872e4054c8bf232b2a04899bdec37b828293d7095a2646bc8793421cdb4e3e8a4d91a2020c5f2ea4171460ead5565c6d152bdd291399a34c41f1d16c5ebe209014a0
    9a359350de89b0f80ae4366951d15523e8af4244ad588ff561494c3916768afd1f49016e9ab701f3e6450b5bcdc2899b9019ba90eda37495d2b1b6714d6c9d8e95cf935933d19fd25deb6aba15a0bd753a6e3141abe7de655c85b5e43b1931a2a60017bff71eb6fcd11fe1e8d1a35605a7548029c78ec1f4918fa05d8897f7
    078402a41b7057a0ed319e6e614b670ab0abb642283f7561443f80acac1cb63dd052c5fa97e5e494328bb0aa3487a5654b216d4e6915dbaeed1a81f00f0303421ca517e229ae65c07f6ed0035d01ca90c2721d4101fa0077e5655a1560670f6efdc74409e1d0decd18edb9859854b13bd05ca5a6bd1343ed779074ae1cdd3a
    331e773fc0b10b5538b23f1677afc4a1acfa1e8e9ebb810d1ba8afe3d490035a47c8cf5fa900cf9d3b272a3869db5e0146464662fd473fcade5f797f4028c0f1a7bef3c421bfb4d4b44e3f4c0eb3d193ef6c51803381bbf7339d7939fc2fe76cfa012e8e88c2fa7db1884abe21c5cc4dbab5461cdb128e8dabd6e3e8b64538
    17bd015bd7850bcad024289c0aa4ef09c393de7e5c3f130f5746038ff76999b71e35e4e7af5480a4d056fef33fdb6c2b1520159197fef11fdbec0f0c0b704f358c71e288026bbf29a305869d55d02f5754889a2cac7ec0264ec0b063a273acfcd2da17412c377bd9ec56b3894057809b9684607f6691b42542757614883d61
    a148c8ab9c6421cafbbd21a015e07f3dacda117aae632eea6413b9fb328c7d2b0bc6a4ba49f1bab7afc0b0bb1acf7a06d8d4ad72a067acdca6a95095db3433a0729be481864a1233a600a97b857ef1559884622c9b608546541ca985e1400d8ce98d3028dc4891a29c14972a8e1620ec156049e3202ed5f4a0a96704d7be46
    c35ef4a0b689acac2c142485a356c8842ca1f84b45da82fa2e6415044e3125d015609710de5d92848888c5c88b5880f8c54b599d1d05793f417585547df7e62bff82f7dfda66ddef0d81aa002d0f9ea22ffbbe8d02acb85985db5535b32eb83aec902057f84fe22a55cfe3af40f584f49e7b1bc6fee322fb0d73aa11847e18
    d13fa2c73f458a1e4448018e745561a0ab12d4983b703707ad575391ba63216bd428a81fc17bef6d6269038140578025d9f1a8eed422222a1e8d25852c64c747b04050ab6f7e7527a80da35338577c5226b3fee4fdde10a80a904634c8fd00650c0623ea4b33d9bab14fbcefa8a3e5b8967508c6e7b20fc9718cccb097a8e7
    cf9f5b0379dea1fb760553c163e6499b1c553c174a6e97cb27fc62d2ef242a8ac56190c475e177ef8c17f3c311f2714a468473ab21bfeb9e22ffce39a90095b8fbd2cc3481ae006792405580d4a74c4d016edd99829b8d3760ecafc2e6dde7109d7c03293171884b3a8a2d7b721071b010dd7db7b17aa9d80b6126181e1ec6
    ba75eba0d1685415208dc726b764ca407134791461301ad0a33361d7f63dec7746ecce45ccd1ab58f9c19b387ef0087ef98337b1fe601152a26361d236e33f7efc1656856d6569ffe3476f6175d816e81f97638b903f7ba2f60b79311feb769fc5c63d8784cf8305bb4316e0976f7c88fd195785ed0966bd0234ecbd8bf17e
    2df4cbd407da4fd548a2dccf15a0efe00ad03d640fd39315a0015af338ee563620f56436aa4acee27e631f9a1e3c84f9f96334555cc473cb3832f2af232e4eec0339130c0e0e32c577f6ec59550578f3e64d6b03821c28ceaa0085f4e947e231dc5d8ef88433a82a3ec37e67eaa96c3c7f5c85fa1b975056d783861b17915f
    de804661595c9ccdd2d2fa35a1586bd6f6b3fc79d0d4cff2a2b6b91fb54d7d382c9c57abed43427a3e0ec727b0ebc9cc7a0568a953d492ebcdac3e90b5e2eeae866e41294cc59d305fed827e63a5b87fdd0dd618623af788c5c9fb09f9a5a5be789431ca60dfaf283e6ca2df595ec41ad05dfcf2f5792c2e1008740548f946
    c5def8ec1244a5e54b45db419697fe261015e0e89745af266a16e0d0c013f4f74cd4553b42d083cc33f1d36743528c50642cf0af076b19b200e54056a02305d8d4fcc8a1027cd6db018ddd7b26fc1c1688e6e616145cb7ed0a353aa291d63c63d62b40dd9be22803f29422f7f027056726c52684f167625f3b5a97d1be5500
    fd2ad14dbbbc9f50beb453d1d9d5890f97adb02ac0c8053f9d9697d7550249019217187be47c93c38aa82221aed9ef79482dfad460e60efece4b436495d88027a0a6006b87850f7a4f05e2b685a0f8741cf69fce10d65760f3c210841fcac2fa158b59da53775a909a7d1b895107b133360e052722f1870fd6227cdb219cd8
    158b903dd948dcbe01e917a61e2ee60e942f555555d6d0d1d1ee500176f7f662e1b21d78aca2005b877518d4e8b076d17cfcfe77cbb03ba71a8773af203eaf0ca7b747b274bfffdd72ecce6b6069de797b2936fee1774cf17bcaac57800cc1b29319d7aaf4985756802a7d8ccbebd27e771460a013500af03ba75877a59986
    c68a7a22f0fece4b1a9f2ca3a600572dfe03e2538f40df578d88903f2032e6305b3f10168a7589f958be62154bbb2564014e6c7a17d94949e8d39970e7521ade5db4191fce5f0ae3f0438c3c2c44c1b1bd387ef12e4bef2bdc5180e565b7d952cd025c1fba14c97995085db31809a7aa9170b20a6b0e672334ee14b47d4d08
    59be5288139462f205318db0ffc6b15d560bd113e68602f4115c01fa0efbbc3457f4b2a2e74c0653a63844ce5dfc9997c6e30d18a7390224d414a023c6cdfe1b49e40eae28c0ebd7afa3b1b1d126949595d9284035344291da9f7005a8c01d052817d52a85a2b008d502060e81a6006733fecc4ba5f547a829c0e3e5ede8e9
    7a84654bb761dfa608c4842f43f496cdb8525688d2cc78d4f6f6615d5c16d6addd2a1d35bdb8a2001d61558046036edcaf45d1b9741c4d3e8a676db77120b308d1bbbd535053c115a002f714e002e67184eaada2c2a9418406ead708a193ed8bdf1185b8d8c9eed5a70bae007d87bff292a641555a7f849a020c3f908d6b25
    e9b871ee086252aea3bda30c9bf69ec4fa4d5bb1716d34ba9f6950f4a010350fdcf372e32b7ca500afdeadc1c19dfbb1efe835446e588f0d2b5763ebb67d6cbfbfe00a50813b2f2db560129dda41d6a997ec3f1a3912111165dd3793049202341ebccf7afb93b04d57187b39436c16f501feca4b7beb8f70b508dcd0ea9dbb
    345fe28a02a4f958aaabab6d02c54d5504f637242bde10b40a30d009240538f6dd9999bd4bf359c77e17ddc11f7969d87c8b4d766f8f9a020c09db899317afe271ef30eedd6f40576b1df41603ca9bbad83660c62ac14afcf1abbfc3deb8a38235358ef97f08c7a1f377d831350f5a71e5f235d4d790b231a1b1bd03658d13
    bd22bcc5150528378228036b04497cc8ac60ae000100ae007d87322fa9016226f056b865fc91978ee6b0505380d75a8731d452087d6f058e1d4b45f89a6dd82c1413bb7b2bd93629c086fbb948d91f27fce84e748c99b060e1266884fdba9e4a18bbca703cf610f625a620766f144bdfe360689827b8aa00eb1b5a98e29397
    144790253c130ad07cbd1bda1f8a2eec3c256815203582c487ad933c159357e234eb9856314e8bf8ec6ce6dd98d50f0e56081710bd16cb5e90a90e91d2bff9ca77d9b62f09740568d40af137a3317a651f4c233a584cc23195e9b0f495c2d09c01e3e044675e4f09540538faf574696d32ae1681dd2564cb5169cdf7b8aa00
    7bfa07b060c936eb52568034c840f37f4eb0e7359d81fa0b7b4b502bc0e4c84da2a762ade895b8286a05e217cf93bc1703bf5bbd8d75f82505a8f45a2c7b41161b4cc48ec0be26d015e058732b46f3b76124ff2046cbd2052558c7e235a5f4a23e62ebde4242ee0b7c9997e3033aa716b19a025cb06809860de27665d23e3c
    7e3ed1ef3510705501deba798f597ef2d2aa00057ca5e8a79ba055809371dd5bb1a814fd4ba02b4025a6b6b33603d47d45202a40679e8a89490ad06840b7d684bd211bb072c93ca4c525e1e73ff815d6866f9352cc3cae28c06bd7ae3107a4ca407d0365b8020c00bc53808145202940478e2afc0d29409a5dcf5b45e8abbc
    d4af2c536df850a266019e4813ab4cd2d24ea0a3a515ed35d771b376eab1c1d3852b0a702ab8020c00dc518062b1d5d6ea939d75da768369664e3fa742d5d1a75044f6944052809a4fc5332534dd819cddd272ecfb67d97d788a4ff272ccc4e6a29d0a35055859518111e3e46b0f3c1b93d66616ae0083580152a7e7c2e810
    ac094b5378385e83ccd077f0dac2709686286aae41c4e237f1cb7f0ec1baf028cc0b8d60c7922764f95865dcd210711634f93ce43cd41d024901ce24a35f3b01cbed3eb1e8e964a63067f8222fa72afaca4c2e021bf1de8245b892bc1587a3a3b1725d18b6adfe0316ad88c0fca53bb1615f825faa0fdcc1150548f57dd4ef
    4f19781da0c82c2d029337e334a6ecc8a5137586268fc5e4e198e6b725eb2d229e5a80c5ced104b5fa2e7f7d219ba396e6ab955b8de56395718d25d9423a21a1749e8808c9d79b9ab307096346a3b436f9a555ee53c3103931378ae5d1c4f84b63b2d838e12e81a2009590c765b9e3ad3b78ab0075f38ad97ccfaea0a600e7
    7fb8108f864da81ad0e383f716e058f2099c3d968e8d8bdec2d2654b678d02a4860f65e00a50242015a021ea2eabbc77358c0f4dcfc074670e5ee5c9a188490a50b16f2a27b196c6892e28f4db3c419997da1fe762ecef4f4dca337f057dc87556f4a562a73dc68487d07cc6d629e65478a100292ff5d2c439aea056040e74
    dc55808d0f6bb9025410700a70f4a55436ad9eabd0f478f4c21d3b760cc597ae089922f559f003a4bcd8e44e0a8546e8debe0cfd9a1b56175fca97d67e1f9d43bfae42d006b64542f2a938fe58c35e5ad9b72229145341074c675aad8a51ed587b940a70ec7b64094f3fd400a28a900f3434cf5c224fbde41c6f14a0e6d347
    a435d7986c011a905b5c8aad51477164e75a945fda8f8b572e60d7b12bd8b6650f4a5b34687e36b3cac37505f8185b177d88a703bd5c012a083805c8ac070143f5c48b6ba85c8eb12bf3a52de1fd6fb6edcc4ac7349ca960cb4b972ee1c89123c8cbcb437777377317ee6d2037e3168b45d57ad32d2cc5d88f72542d40b57d
    fa2557a10f2d6753872aa1564a8a2745470e3a4969328b4a8823efd95605a872ac3d36d6b4700e7bde8ac843545414ba1a4bf0e68e6c56fcd752715f28ea533c5b8f4ac3177fbc443ac27de4e7e808f2fc3d4a6386a7c05305484ad65dd414e013ad095bb7ecc2a9b3f9b8d37c0b697bd661cdbacd2c3e75d35b52ca99c375
    05285a80b52c0d57803201ab004df7d231bce7ff65eba400097d9f0ec369dfc1c889978404dd78766613fbc1748c3fc3c0bf9f15325bddb2a41eedc643f7a52d11f9a5d5af2e9bb46f3a70450146e43523a97210c2026169f7d0d955c946d550fcd265f310fac657fdaa0009ea984ce92c765e599478a20069b487ece5d91d
    dc2d0277744ccca23653b8a200af5ebdca261a57068a93e10a1000b0578063f51333cb9bbb2e415b9928246a85b62a916d9315a8ad2b65fbe998c63ab1db05596c342f827da099b0525252d8bcc234c9b25a1ab5303a3a0a9d4ee756c67a536cf3055329c0e9c0150528430e1b68563635dccd4bddbb45ace5d913d414e0bc
    e54770ef661152626250fba81f952545e8efe9457f770f8bc7f81836848abe007ff6cabfd251b8f9a00ee7cb4ad0d75e2bbc9c63282ab98a47b51550e94de335942fcad6ddf6f636b7151a57800180fcd2d21c1686f04af6e2ba1ae865a3c9a049595151752a1e3f7e8c53a74ee1f4e9d3e8ecf4a1670ea988acf6d21adc6c
    01a509a63c255014a029a59e3d4b575c6339ea2ee38e0234ecbbc71a5a3c454d01c6a5df42afde84c8dd71485cb3011d63e308ddb80749bb77a14f88dfb1350a4776ed117e800ef33efc3d92a24487074ffa6e63577c09562ddb005dcf4d145fc847b34ac3902ff0745e6019ae000100e54b7be1c205b4b4b837798ea790d0
    e7e4e420333313adad531469a499efd86a58054c279b8517ae163a9a0d6fd4c8baad18339bd0bbea8af5611862efb3460cea0a23a765c7d30c79cbc5e148741ec35e71de0e79e63cedabb9528389b8ed0e5329c0d7df780db94ec60452d19831e8bcfb8e33480152d0fd429cbddf55ecbbcbb8aa008d490fa1dfe89db277b7
    081c284ca5006fdcb8815bb76ed9048a93e10a100050beb4447e71194a4bc5226e7fa7a80c87c7b4b018b5181d1e84563304ad4e03bd5eb0fa847d2d0dedc257d888fea743783aa4c1e0f0289e3e7dcaf6f5f7f7a3a1a9151aadf3074d02448d28e9e9e9a8ad9dece1576e9d95d1cd2f9ed4c545b7e4eaa497566e3956a625
    74ef88bf978e51c266ce5b3a31848db6dd612a0558d4450e72e2a16dca45d2921f63c98fbf8837befa45fcc9b7dec217bf370f49c2072822741e9af32298271d5a7717a600058b8e4660687f704e8a750d63529db5bb8c2b0a9029bf65decfb63649010aa58a5ffe863ad40bd71872d42753b0f69cf40f9d0ea65280ca4610
    39f0461091805580c7cb1fe383b8429c397306c3fd4231d5ac87513b0ca3e62953884dad4f84b83174b489ca9114a06ea817bd1d4da87bd48596ce7ef40febf1f4d933a6041b5a3ad1d0decdd2ba02d5fb15171733654895cbd68c9567c153ce702721cf8ae792d562b440f77eb1b4a1c0febc2ad7998aa914605a54041bdd
    429dc3c97d587e5a14b2e3a3f0272ffd2df3ac2defa38ee4a2a76d5a770f5280727176bc59783185ed71d9ad8a2b48dd65ba32ee38cd4b6a1167dd8c7c809a05b8ff58199a872d78dc5589d4b045f8ddaf97a345d8a6b8aabb25f8f1cf3f600e1366125715607d4d8d75c915a048c02ac007d2c0756a7d2525e4ee0ff325d4
    d7908a0c741fb4a46d67b8536fe50f9479a9fd492e5b4e379acf4d1e5f4d8e48a9bb8f3b8cbc7f05cfff2255352fa9786dcaf06cb63935d4146061e10d418f8f335ddef5f4192e95dc92b6c731f2f411aa1eb4b1f599c41505b865d107187cda675d72052812b00ad09e8c8c0c8c8dcdfc0074ca60b208491992854896a23d
    81a40047bf9a06dd6faf304b705ac2e65bcccbb023cf2ba60bede27c1c2e2a0d969755620bbfb2bb8ce67389b00896a52f515380a4f87a46267ff0f2d227d229d76702571420b700d5095c0bb0736248d848572db2b212919b9bcb1ea02b3c1bb3155a2ab9dac7f902aa2b246578f1e2452680442029c04085bcd4b862bd29
    f392759779b340ece4ec07ab4bad0ef0ad77b7e1c8da3f6055680462d32e207dd7412c89cac4ceddfb11b27e038e1f08c386b55b847df938be7b1bde7a6ba574f4f4319502a4baf4fbf7efdb04b97e9de00a1000b07f698f963ec25bb16271292a44ec71ff5e4422f6ed8941e9b5eb78aad1634c3f06e3d83356f747f582dd
    ed0da86dea405347afb5ee8f1a4b48f10deb81fe817e58f4c3d6b4be865a91a93599bad850bfc34054809ae1a18009ba4d9518fe42a2755b0da50224df86da7f3def957719674cb6000d782abc64ebb62421ffe4192c99f721cc638fa07d7403f9a7cf62f1bc0568afbe84e5e187b03464051a1e5ec112617dba994a014e05
    57800180fd4b9b79ab073d4372f152cf3a30d75614a065408f6bd58d3877ee1c8c66236b1536eb4761d46a58ab6fffe0306b05d61a2dacf597025b17e2e5386a45d60c3d95ceed7be8a5bd7dfb36eb67482f94ab56abaf980d16a095319358bc7da0de2d87f2b2edc6c3c945600fbdcb3843ad083c1be00a1008ea00eda1ba
    37aa170c44ec8bc0a474e5be864d4dbeabb477c4ac528012aadd65746636bd666f58b1aa602bbbcbf882c94560d125fed903bb51d6fc182ba213b16a7f0a56ae5887b065d35fd47504578041a80065a8fe4dad216226b157804a48400b0a0ad87d3f7860db2fd0574c9597f3e67d804d871c7b89c9cd173b65cb90a3d8a8b4
    7c69cb0e6d27f3a1e80bc65b8799a5673adf264ed71856e1342f19b27799ab4fa408cf51ab033c7af214362e0fc3bdb67e1cbb7a17a945d938793a1b7b12bdef77e82bb8029c830a90fa9f5daae941538fa030122310bb691d5aefe6508b08724aab902314894f276e424541168e1e3d8a9aea5b620769a1986bb458a0379b
    591de04c30e54b2b418abba4a48429432a32bbfbf01c31950224475495496178ffad6d76deb4458fd8344540ca8e1df8e9dfbe86a8a22e313ebb84a589df1185b8d834540825d6a22ef2b84d9eb927bc70ab79cf365dec70ee94d4203cb3c30f58cb2eb9d1a2966bb9bb8cab79a95f741563dff0ae44c08bc0b38b39ad00fb
    47f4f8a748c9b218a943d4c94abcf5d6422446bc8793512178efbd4d8262dc8490d04348dcf41e0a4e26a0b0b40c4d6ddd6c185d43c3cc4d5ce3ea4bab84fa165654543065585e5e0e93c9f3ceb5532940f2824d9eb1c91336adaf0bcd64deb4658fd8ccbbb6d4499a3e44b285476984b3b37572a1451da52928bd70934b2d
    3abe536b5ba747feff741f9460f4cba9cc62234b8f949df61717614ca997524d404a93acc0279d5d2ee7e5f8a0e85d66bc5323c5b8875a11984679dcaaaac3a9ecb388395681d2b23bb87ef994f0839ee36c816f3a607b0b5780415c0456425e5ec80fe04cd3d5d5c55a84dd7d1832749cdcd7b0b0b0d0edfe8fbec8cb4081
    bacb741fb8e1565eb2ee32bfb92c6db98e9a02ec178ad83b77ec85aef71616bfb702e90763991384b56b37e1c4c1c352ca99852b40ae00ad90b2a0c6065f40dd20e8a5208bce9d40ca8bac3952846afbdd0d6565654c19523fc8e6e66626e8cebcdecc250548bfbf7b450146ff2c458a710d4f266372a708dc5b5b80835981
    510fc81560902940362b9cb649089dc82ea9404842be7552232a78512690c2201759de40adb781065996e4f7cdd96f9b6b0a9009f6a8d169771947b8d35d464d016e5ebb04b15915e81114a9596bebc6ff449e7f1ab1dc852bc02054808df931c80c5dc8b6c97b5361a756548c0ab2b3b3d1dbdb2b6db90fb9d49fcc238c55
    c6c0382875dcd54ebf5760b2089dcd7d322715a024d81e79974976adbb8c9a026c1f35e3fc9efde8d48da3f6c94dfcfc5fdec6ae7dfbd9fed8f4db6c39d37005c88bc00ea156562a927a82ac00c7079ba089fe3b983a6b842d219385ff9fe5ee84b66429cc2de2cb40aefaa78b60568084dc5dc62def32e4bce063879c7697
    515380ddadf73162026eddbc85f3d15bf0ace7113a0634b879eb361e37d976179a29b802e40ad029546f464e56dd45dd021c8256b0000972cf4fdbc6ae3bd2faf410ec0a5086759771d359ac7ec93587dd65d414e0ddab396897667e33ebfc377ac81b681a08eaf9909a9aca15603028c0eab438c4a415495bae4182e16ee3
    88ac00a9329d3c40ab7a3f7123d0a8065fc015e004d45d46f3f138b79c2338ea2e3349015237189d191777ed6723421a1ee6a3a7bb09ff3a7f0dd22ede44d2960d78f3974bb02bf5c28c4e904e961f39e3181e162c63ae00599cabcc520b508b4d09b61d73e7854eedb49332871a475ced63675580c2cbe20c4d590c4c233a
    98a88b9cc9d66a34774db4149212f4055c014e867997c9a28ed9ae63df5d46cd028cdfb51605d55d58bc6c0986741aa4a62563c3ee6358b47891705f1558b1e53096af5839e30a9017818348013696648b9e8a2775cc750df2d6428e13a6c25e018ea5fc842d6dd08af58b63e549d07575c338f208fab2151829dc0b83a014
    0d953bd87e822b40f77155011286ed773cee2e336e304f52803dbdfdb332b8ab8cd5ce311b82fc3b791da007500763f28be60c572d40b94e50779f8ab88f9815a8bd7f093a21de3258c9f6115c01ba8f3b0a903185771947507799a79bafd92840ceec802b400fa9abab63932039c255054850c6ebf57ad63fcfd143509d03
    c403b8029c1aed1bf9d0fe3047da728dc103b730f8c983d21667b610740a30779be48a48dbc906e91765e7e25e4d351b889f9b9d26ec6866fba893f4bce86ca7c5e3a1a121875f7d5901921f3ab921c351185e7f1d4fff24168d9fdd83f6e5e731b6e1c6a434c644cfe7ac55c215a06b58da46d8c7cbd5ee32ac089c7972ca
    ee32818229e79160e97ad6326dae74bd7fac21eaaeb4e6025a139375d3e9e999d696083a05d85918cd96d411ba307a03f35e2287dc262d2a069b27759276063922a0c611fbc98e6405e81cb1e2fd4e9bd8378dc295ffb316b7dada98f2f56446b5a9e00ad03d46bf76c2a5ee32ca3a40ea2e237fb0c8b227a83b15e52dd152
    37b5b30db3d6bf238948d138c3d9e4fae6e24e69cd1679727f25ee4cd2af76fc54b8737e357811588193f9bea784849f2c42197714e0deed6118fadc41f4ffc551acfa7d34d62d4e60f7921df936dbef4bb802741f73c1e329bbcbd83782c81c3a74884d71a0d168d858f3edd9c548deb206f3d7ecc587f397203bee18b6c5
    16a0436744dac12358fafe22a496d563c91fde46ca990a2c5bb50661eb56a1b1280ea73312b03aea043644ecc3829090490d1696c621b1cbd5b6dbd053a921b98ec5990a3ad8c4fac64362bd35cd31ad5480f23e4a4f1876575b158ba5fe192c5d1a9b739102a4259bb45f3a8660735b2fbacad2c9e8de165bcae589fc0953
    91ad02d5fe9bd8cf968ea77b33dfeeb3493fde3b269cc0ccee65fcb1c67a7e4a6bbd4fe9b7bb0b57803e84ea04ebeb45f74cae294011724e4096424f4f0f6b55542a525fc315a0e738eb2ee3480192df46d9e92e29c0c387e3b17b670c92f71d40f8f6388cf4dc40ef8d73ccffe4e2377f83bdc915d81d9789437bd6222a21
    17f18949d8131f8fcebe3a1c3fb0094bc3f7a05b6bc4fe5d9b26f9acd46fbe2514bfc531c7e31a230b4cd109ca8394966cb9d92b40791fa5272542c57eb98b8fe95c2bb380edcfa50f2d877e63a5780ccdad6c126478c95518339bac16b36e6129c67e24d6a51ad31b61d85fc3d229af4d69688822a1b400ade9050c5b6eb1
    25f979a4eb2a15203d0f9ae14ff9dbdd21e814605e4494b42614871d966eddeb13a6845a87e95edc518032d408f224a2089dbb4abd76c6e008ae00bdc3517719470a9013d804a502fce5eb6158189ac98a99d4099abc16cb1e8dc9c967e5a0e70a901818186013314dcdc475a80e9220eb6fe48503cc1183f281c8fb7ff1fa
    2fd89220e7a1f62ee8a7822667e70ad04b54bacb7005383b093a05d85852c11407f35c1c2fb6f2cade8c29a445454cf248ec09d4b3feeeddbbb877ef9e5b81e6fc38b1ff28daff8fa0882b2b55d3781ac83a253f83f60d364ab802741d657719ae006727bc0ed04f506692a27137d03498a4a89efe45321e3d6862d69a5a3a
    4f833367a8045780ee217797e96be9e20a7016c2156080412f2d79e7a00691e13f8e6596e474c215a0670cffef54dcfbd7e9f3eae32deef4e5f335c68c4669cd352c8f86a53511f9deede33d21e814607c98d8c78f8abacc0b34ebf4dc682d0acb533896530b89a243f47421bfb464f93dd95088c731d7fcd620a20657809e
    4145e092b01393bacbc82dc0347288f29668b85fcb96fec43ca6aee0e49656b94578ba91bbbab883b25b0d21dfbb7dbc27049d02ececeac487cb5658bd40cb9d9ee5ed09cfd05a9b0ed1d385f2a5951b44e8e59a8e9798e00ad033947580d45d86fa0e12d40ff0d6ad5bac0b0c8588139790bc7915de5bb5130b3f5c895307
    9210b13f1f1d5a035aae1c45cce526ac5cb81acb7ff1531c4ebf8c25ef2fc5c2f71622f1da635cda17c9ceb96fc522e4555ec2bb1f2c42dce9b36c9974ad13a18b176311a52db98f958b7f8f88658bd169b0f55e242b4065df3f5224d4af8fb0ef6b475d4ce43e7f729f4042d9ff8fa0fe78ac3b8c009d9ba07350b71ab99b
    0c212b40ea3223f7db73d4e7cf726f809d8382f188784eea42638c17d6b52631deeefedd851781030ce54b4b75761d558de8ff7f4e4cdb04ee5c017a86a34610527ab2054feb313107b06ff7011c8b89c5da8d5118edbb89fe9bb9ac4fdf96edb1d8b7211c6b37edc385a8cdd873e43476ac0d454c4a05a28e9663b0ae1407
    84e3372f5a86e4f32791b23f0e3b77ec61cb3dfb527070f75a441fabc4def853888e5c89dd5ba2d0fc7c72e9811490b2ef9fdcbf8fb0ef6b474bb9cf9fdc2790b0e9ffb7f41a2cf79f5a2d3bd94293fbe6292d3ed65750dab62a53953e7fbadf17b2a2325d9f827c3dba577d7825f42bcaacf1cafb7717ae00030cfb97967e
    db4058095b4e075c017a066f05760f527a8140d02940b9882b7782b6dff61772d183be5a66c55020da96a12f67476aa5f561c8fbc812d42d2a65ebae603f3e52fe22bb0257809ec115e0ec24681520ebec3c58c1b61b0727b633b7ad46f4bc37591a5f62a1002b7b99396fcc6a62db64d2c368618aeaf1992af47d78910d29
    52eed3be2a1493da86a1978a08847edd0d5624a13a179da4f4284e1e5a64bed52b06e1bcec7ad4faa6353105497527ecdc764507ae003d832bc0d949d02940f2084d2dbd6267e741b1f373529a751b838d58fdd63296d697d828404121599a8660691fb65a79727cc7f19b785c520b73db739b7dccaaa37194bb6d477e68df
    2ab0a9632174efd8e685f57a42301c90ea5a226eb2f92dcce5b643f6b802f40cae006727bc0e70a6102cb1f127a3d2c604f4d2b6d5355b2b88ad48ad68640d5a91e39428f7ab215c97d2b08a6395e3b902f48c405280db4b9ee24f36367a1d3eb7a9899dafb1b1918d4af2361417fbc6a9af2fe10a30c098ce97560d9e979e
    11480a70c39501747576b05145de844f6c10fd16928723b5fdee869b3727bcc0040a41a700c58ed0835687a35407182f8d09a6752a1e57e7a749f58210b663840b889da5e3e333fde2a45489b39756adf7be5b1e775d802b40cf982d0af0f1e3762c0c598edcbc0ce41fda8c8ec79daae9283853808d372f61f9f210b4b7b7
    b16dcae78ef676b4d3fec76db8d32cc62b0357807ec29d9756ee084dcaad4bdb2428bd05cc1dbeb223f4d2c5f1d8b2231e955d3582ee2bb4e910ed8d9352b91ed0196a2fad7c1cd5e5d963dfe2ebca359cc115a067cc1605d8fa201f9ddd3d58b76005166c3ba89a460ece14e0c1356b98638df58b96e2c3d5ebd15e9387f0
    a833d8b3f4f7085db50d775ab8029c3666cb4b4bcac9c6632e75225d5701dd8252b6a4ba397a699fcccf83ee8312180ede676965a5a6f4ea2b431e776d7ad20b6995dbeec215a067cca622707d7d1d1e77b4e3f114c564670af0f1e3c7a8abab474b5303cbe30ee17c6dadcd686b17cedfd0285a8276812b403f315b5e5a7b
    8fb904ebd92e5871d4dbdeb0b3cae6a53597745995a5b2f7be8cec7157d9939e5d43b1ed2e5c017a464029c0cb035871a60521d9de858faf9f50806d6d6d5e076a080934b8020c30a6f3a55583e7a567049202e4b80e578001065780be63ba15e0e9d3a7b1b37480875914b615f7e3c489135c01060a5c01fa8ee9cccb9191
    11545555b1395778985d81ea26691a0b77e10ad00f7005e83ba6332fe91ae4f585fc38f230fbc2549ed2d5e00ad00f7005e83b663a2f39731bae00fd005780be832b408e3fe10ad00f7005e83bb802e4f813ae00fd005780be832b408e3fe10ad00f7005e83bb802e4f893805380cf9e3dc3f0f0089b4ad21a865c0cca6366
    30b4b6b6068402e479c9e138276014204d1874e3c60d9c3a758af5c69fcd212727079d9d9d33f6d2f2bce4705c23601420f5e1a12f3ef5c69feda1bfbf1f7abd5efa65d30fcf4b0ec73502460172381cce74c3152087c3095ab802e47038410b57801c0e2768e10a90c3e1042d5c0172389ca0852b400e8713b47005c8e170
    8216ae00391c4ed0c215a00ff85f7ff96d7ce52fffc62670389cc0276014e0d3a74fd9b0a703070e4831ce59bc78b1b4a64e4b4b0b3b274d0748e78d888860f17171716ce90e535deb0b2ffd95105e66cb3ffd5f7f8517bffc972cbeb1b1912d95d03d11539dd39ea9d23bda4ff7a0761f4ae47b72447474b4b4e61a34b190
    3d454545d21af0e0c103696d02e57e19394ebebfe2e262b674074f9eb7bbb248f9e3eaf354fbedce8e25b955cb1b67cf94ae31d533e588049402244818222323d940785a52a0f948b76cd9625d12afbefa2a3b2636361667ce9cc1b973e7b06bd72eb68f90cf979e9ece962121216c492f444a4a0a1b5fba6ad52a360704cd
    8e9f9c9cccf687878763c3860dcc03c9071f7cc0e2a6bad69fbef4972cfcedf77e885fff6e3e5b274848b76edd8ae6e666369f2a5d835ee2ab57afb273d23dd0efd56834d8bd7b37162c58c08e9391af474c750ff6e7937f87ac00e5fb58b3660d3232326c7e9f7c4ff23132f2b5283d3d8fbd7bf7b278ba6e6e6e2e5ba7fb
    908fa1df2043e7a7df432f307d84e8f7cbbf91f6a9ed27e70d151515d6e72e23df1fa5a56394cf8e90d393eb2c0a04ddefb66ddbd8f3b6bf47e5f11b376e64db4adc9545ca1ff9f910721e93571e3a073d7765be53a0bc96ef5f3e362c2c8c5d8b908fa5df4c7943e9e93e0f1e3c88dffce637ec99d27396cfaf94613abf9c
    6784f2f72be547feedcabca4b8cd9b3763e9d2a56c9f2c4f725ae5b3f7377d3ff811cc5de2f3f41701a500e52fbcfcd52e2929610fda643231c19597043d20194afffefbefb3b432b23012caf8458b1661dfbe7deceb4ef1b2e00d0e0eb2fd64399230298f99ea5a5ff85fdfc0fff8d25f20f34c3efefbfffc3abef0e72fb3
    7839cdfaf5eb515050c05e0272514590601d397284adaf5ebd9afd76f9f72b91f362aa7bb03f9ff27728efa3a9a98905e5b1f23dc9c728a16b5158b2648914636b55868686b225bdb04a94e7a79758fe7d1494c713f27ef95cf2739791ef4f3e5ef9ec08657aca078264859405ddbbfd3d2a8fa7f3d9e3ae2c521ae5f391f3
    58b620e9f729f35dbe5779a93c76fefcf96ca93c96ee85e4b3bcbc1c0909094c59d1b1ca344a19a67d729e11f6bf9fee97941e619f9774ad37df7c936ddbcb274169e5fbf637c607b5d29aff98357580f2174a5eaae16c9f1ab240242525b1a53b28af450af01f7ef833a108fc972cbcf8e7a20548a8dd13c5d10b44d82b0e
    77509e7baaf34d953753ed57225f4bc69d633dc5fe1aeee69bb7c72b91cf35d5efa66b501a5250aee02c5fe57df60a5b8e579361e5f16af73a95cc10f6fbe463ecefd59f181bfbc495f171747c651b4c8f268c1b6fe18d203e60effe38ec8d11022df71f6281c3e1784edd531dfe3cee217adfcfc2dd6fef052ca2c2ed7d43
    50f43ef40dc9152087c309381a076b60a92d40fef70fe00fff7717464b3f82d1eb9f92f6fa0eae00391cce8c72e5f265b6b48c5bf0cb73df120c3c8bb06e4646ed018cebc9f21bc785e614f48e3e66e9648a555ac7dd852b400e8733a3141516b2a5ce34869f9dfe0b68879fc3f03013a355ff0986c7bba16f780ff71bff33
    52eeef61e964a861ca5bb802e47038338aac0065fadf49c7e09218689bfe42100b1d4f87c0152087c399f5d82b4057e10a90e316345b1c756bf0a60b883b50075a5f51535323ad71e61a5c0172a6057954cc54d82b9b8e8e0e69cd3de48eb9be60ba461f70fccba68808d6c93a72c70ea49f38c1e264057860ff7ef4f4f4e0
    786a2adb26f6ecdecdd21f3c7000a9423c8d1a9247fb5cbe7c1985c2b10f1f3ec499ec6c1647c7d30898dbb76fa35665d8a13d5c0106114a0568301870e9d225d6ab9f2c429a485d86940d6d9380d1f0393aeefaf5ebcc82a4112d345939eda774742c75ce95c7ff9e3f7f1e77efde65eb4a05a8b43ce9b8dede5e9bf3c95c
    bc7811f9f9f96c9dce49f3029bcd66764c5656168ba7e1729cd907292525f2b03f5280f61dab636262d8522e4590fcc9ec97f6252624b025d1ddddcd96b25225cacacaa435c770051844902223a54442252bc36bd7ae4d2a12cb0a90a074b20548eba4dc689fbc5f3e96844d4e373636c6964a054871725a52aca4f494e7b3
    87e604a6fb20e8bcb44e4adb97c56acef492979727ad89646566b2252940e5d03d252323236c49722a439622a13c9f2c73caae310d0d0dd29a63b8020c2264a547c8d6171529a65280b49f8a1a246474ccfdfbf75515204103edd52c408aa7405cb87001f7eeddb3399f0c59a5b20568af0009d90ae4cc4e2e4acf96e4e794
    c2022476468a0e30c81a6c10e49270a600e30f1fb60ef15bbf6e1d5bd239a9c4409c484b634b677005c89935582c16ab707338be802b400e8713b47005c8e1708216ae00391c4ed0c2152087c3095ab802e47038410b57801c0e87c3e1703841063700391c0e87c3e170820c6e0072381c0e87c3e10419dc00e470381c0e87
    c30932b801c8e170381c0e871364700390c3e170381c0e27c8e0062087c3e170381c4e90c10d400e87c3e170389c20831b801c0e87c3e1703841063700391c0e87c3e170820c6e0072381c0e87c3e10419dc00e470381c0e87c30932b801c8e170381c0e871364700390c3e170381c0e27c8e0062087c3e170381c4e90c10d
    400e87c3e170389c20831b801c0e87c3e1703841063700391c0e87c3e170820c6e0072381c0e87c3e10419dc00e470381c0e87c30932b8011840180c06a4a4a4b030383828c572381c0e87c3e1f896396100bef3ce3bf8c8473ee256a063028da1a121ebfdddbd7b578ae570381c0e87c3f12d73ca007cfdf5d7a598d90937
    00391c0e87c3e14c07dc000c20b801c8e170381c0e673ae0066000c10d400e87c3e17038d301370025c8f88a888860a1a8a8488ab5a5a4a484ed8f8c8c84c964926245323232d8be8b172fb26d9d4e87c3870fe38d37dec037bef10d7cfffbdf475858185a5b5bd97e35dc3100ebebeb111e1ececefbf2cb2f5bcffff0e143
    29853af6f799939383d75e7b0dafbcf20a7efbdbdfa2aaaa8ac5dba3d168909898889ffef4a7f8e637bf89ef7ef7bb2c3d1def0c4fafc7e170381c0ec77f70035001196d5ffffad7d9b9bef7bdefc162b1b07832f6c8e071760d8aa7fdcb962dc38b2fbe88cf7ce633d8ba752bf2f2f250515181fdfbf7334390d2502023d2
    9ea90c40ba0f32f468ff0b2fbc80f7df7f1f67ce9c6146dfd9b367d936c5d37e4a676fa412f27d922147697ff18b5f20353515e9e9e9ec781a89ac84eeffa31ffd283be6273ff9092e5cb8c08cd89a9a1a365af9cffeeccfd8beaf7ded6b181e1e968e9ac0ddeb71381c0e87c3f13f73ca00fcc4273e812f7de94b5386e8e8
    68e94875121212d8f93ef6b18fa1a0a0802dc908ba79f3a6946232b2a143691f3c7820c54e866ad2fef44fff94a55db46891142be2cc001c1b1bc3273ff949b66fd7ae5d52ac3ab49fd2517a3a4e897c9f64a0d2bd38836a1829ed77bef31dab31ac06ddab7c3dfb73ba733d0e87c3e17038d3c39c3200a9968e9a69a70a6d
    6d6dd2918ea1da2cd9e022834dad364d896ce884848448318ec9cccc6469c95854e2cc00a41a438affea57bf2ac538870c5d4a6f6feccaf7f9c1071f48318ef9f8c73fced27efef39f9f6444db0739edc18307a5a345dcb91e87c3e170389ce9813701ab40357d649c9101181717c7ce4ddbaed40052ffb6a9d8bc79334b4b
    cda74a9c1980d4642adfc754c62835abcacdb6d444ac44be4f6aaa9e8a975e7a89a53d74e89014e33eee5c8fc3e170381ccef4c00d403ba88f1a9debc73ffeb1b5d9b3a7a7079ffbdce758fcaf7ffd6b16678f6ce8502023d051dfb6eddbb75bd351df402553f501a45a34da47f7d2d1d121c5da42f1f2bd2e58b0408a9dc0
    1d838cfa16ca7d0ae3e3e3a5d8c9508d6a545494b4650b3700391c0e87c3093ce69401e86e50360593c1253763d2400735c888a1fdd4d7b0b1b1518a15511a3a348af8d39ffeb4f53af6810c39b55abca90c40a2afafcf3a10c451a0fd944e0d4f0cb298981856f3687f1d65a0411ece0681700390c3e170389cc0614e1880
    81003774381c0e87c3e1cc16b801e823b801c8e170381c0e67b6c00d401fc10d400e87c3e17038b3056e00fa08fb192f381c0e87c3e17002156e0072381c0e87c3e10419dc00e470381c0e87c30932b801c8e170381c0e871364700390c3e1703801c378c708cce53d309d6e8131fa1ef42bcba0fbd5258c7d371ba35f3a86
    918f1c500f2f1c64fb47bf9a86b157ce4c0ada37f2a17ba75035685fbf30f998bfce62e7d37c2641fd7a42187df128c6be7d929d5bbfe41a0cbbaa604a6f84f9ea138cf7d8cec3cee1041adc00e470381c8e5f18efd4c074b61586889ba291f5f574683e1e6735a0349f8ac7d837339981a70faf8429b501e6922e585a8701
    833813d3acc36461f76fbad801e3fe1ae8175dc5d80f7398b168fddd421eb0dffd41098c476a61b93bc08ee370a6136e00aa4053c0d1546e23232378f6ec199e3e7dca4100047a16f44ce8d9c8d3f405135c2e033304a35c8e0f1b60bad0ce8c36edf7cf42f3c9c3a271f3b143a261f36e21abbd23636e7c482f1dc57184e5
    e1204c690dac1671ec3ba7ac46f2e84ba9cc48349d6cc6f8a04e4acde1f8066e00da313e3e0ebd5e8faeae2e545656e2fcf9f3c8cecec6e9d3a77998c140cf809e053d137a36f48ce859050b5c2e0333cc55b9a46658e3d13ae87e5d00cde793c45aab4fc431634f1f56c18c3f320239d30333b8b35ba15f508ad1af1c179f
    c7671258f3353d0be8cc524a0ec775b8016807296fad568b478f1ee1ca952b58111a862fbcf4320f0110e859d033a16743cf28d80c402e97811966ab5c5a6ef7c1105e89b1bf3f8d918fc6b23e74d49f8d0c3caab99bb54db041c6f89351180fdd87f607e7d87324435df7db2bac1f2287e30c6e00dac13fb4811bb801c8e5
    32104320cb25ab394a6f84f65797accdb4d4444b7df22c354fa5549cb908352beb43ae43f3b94466186a7f92cbfa63f2be861c196e00dae1da87f67d24ec08556cff0c193bb658d7ef34dec13ffdcdcbf887657b11fa5b31cdaf36ecc5821ffe0469e7f3f1ea3f8a7191a9b9d8bb3f0e3f7ffd27d2b13c380bdc00e4721988
    2120e472cc241a7aaf9d67fdf0a80f190dbaa04115bcef1847c6d2360cfd92abac30a0f9f411e85797b31a444e70c20d403b7cf1a1a5f557d71cc5a1c44cc587763faa4ab2f1b39f7c4f4a27869fafc944ec9a5fd9c4f1a01eb801c8e53210c374cba5f97a3774f38aacee49a8d9d6107d8fbb1de1b88fc102e3f106562b4c
    b2a4fbc54558ea9f493b39731d6e00dae1da8796879908dc00e4721988c16f72691987f94a27fb28b35a3deadb25187e640072387e419039320847bf7c8cc91c8d4ae6058bb90b3700ede01fdac00ddc00e4721988c1577249032fa8d99675e4ff7c126b9ee3b5319c99645c638461f32d56f8209734e68b1dd21ece5c801b
    8076d87f689f3ce123a902057a16dc00e4721968782297d4ef4abfae029acf26b2fe7a54b317688332e87798cd66984c26188d461e78802ebb099aff5f0a73e0addb5d05a356af9a8e07cf03bd6ff4de4d874f516e00dac13fb4810b3700b95c0622aec8a529e71173f0cbfaecfd75168c271a03dacd0a7d80341a0d3a3a3a
    505353835bb76e315f873cf02087aaac12f4feef440c7ffc105a5789be3079f03e545555a1a9a909838383cc20f427dc00b4c3d987963cfdb7b4b4a0a1a16146426363e3a40f7f71c55d9cccbf8a93b925a8fef2c41c959e86faff168393a70b919e578cee2703a26f2995740ec30b07613c562fdd9d6fe106a0ba5c3e1d1a
    66cf8be4e0ccaa4c0c7e54e5b9f8210cffa703383f3f8d5df7d2d55bd2dd88f4f6f632795593636f0229469d2eb046b54e924bbd994def454d66f43ed034676caaaf59047d78fafafa70f3e64de6f0fa67291dd8593ac0030faae1d2b1668cfc792a1eff7fe2b177e52dd5343c380fdb8afbf1f6fe2b3871e2048a8a8ad0d6
    d6e6f7ef1c3700ed70f6a1edecec644a7126037d5869c60119faf812d44f833ecaded62ad039c84718a1d970c3e69c54255d9295888b71516c793df724ceaffc2ddb2743c7b263fc003700d5e5529601820c0e6a5a9c0e94cfda6436e34c41195b27c85853935f5f043ab712ca9bdada5a545757b325ed2f2d2d95f6fa9fee
    e6c778f06e069eff7f0f63e4e387a05b7c95cda4319b910d40aa913879f224224b669701cb99394cd92de21ccf7f7f8abb987103bd691cbfdb7f19c78f1f9fb6ef1c3700ed70df007c88a88379d6edbcd319883b5d8cbadbd771b755886badc5e5db8da82cbe84b8e40c1677b7ac0ce9a70b704d5816169fc782957b505ad3
    26a5c9434b5f17b2d333907ea952719d8940f721633500151fe3b29399884cbe806161bdefee556c8c4c40adf03dba56908bd4822a2156833bd5ede878588b2b574b71eaea03761ca13400e5738e8d8d2127660b8ad39371fffe03dcbc7d0f75f58db8947204473f7c83a595e106a07f70d900b43ebf1e1c4e9a3082e467df
    d7f200cc3619e9c6cd96413456df40eac95c1647f29057508107c2f24ef5552c5d7b00355d1a294da9204f065cc9cd455e45233ba7fdb356de879a017821391911b159827cf7a1aee43cd66c3e80eb8f26de99bebe36e17da866ef47765e1e92f3ae4f3a0705d900a4664aaaa17af8f0218ba73ce9efef674d96172f5e6469
    fc82c922d6f0fd590aebbfd7f7fb3c949eba34a7e4d2910168e8bd8f858b9661c7f6706c8b3b05a39be54db3a60b85a50fe02c87f2b62ec782755b71f8e41598ddc84a76ee920768b85a8cce91c06d5e0f16c809b9ec97d2185f2bc5061ff42e8584ac60ba8918181860dbf6cdbbdc000c00bc32001bcab027bd0ce7538eb2
    0f5b4a6a1a8e649e475fe75d6c3f20a4e96cc4c16379ec4348fbc5a574bc906663d419eb793b1baa111e9b69dd5606570cc0da11034ec445e174658fb8fda816b1b9b5283b45fb44e3404c27a767872a0c08db735e2c28c6a8d680e24bb948ffc3cf5174a500c31a2dd24fe5b1fd32f646812fe106a08706e080f2d903a7cf
    9c45fa79e1184307a2298d6110c9a7ede5413a5e481379e8b2781e01fd403bb60b8514c2fe59bb62005e7fd4852351914829a815b7ef28df19f15db07d3f6ccf41415903484dc26408363737e3f2e5cbac8b0629d6fbf7ef4b297c03cda030faf574364257f76ea14d0ddf5c944b7503d08ce44d9178346662696e246f4541
    7d1516bfb3039afe2a6cdc7c02fd8d97f0e1f244e89e3cc086751fe283554938b365398e97b7e3c88a55a8ecaec1a69024e8f5c3488cdc85aebedbf8f77f78036b17fd16078ac511a6b99b97e2c3b55b919a5706ed93fbe279561c4162d441740c3f4662623ad237ac42e9a3e72838b81697eaaad93d8c0ed762d3aa44e17a
    e1b8da368aac75efe3dd656bf0eb904d88dabc0257ee75f249306608ea034bb582da1fe7b291c5c108e9a8cf7cf6bfa14958aac10dc000c07d0370fac35406a0374c1810b6e74c3e96865b37ca509c9f89ebcb7e8c92826cdc2abf867d3107d97e195fdd871adc0074c700f43ff6cf7a2a03d0574169005287e9c78f1fa3be
    be1ec5c5c56c1f6d97954d34477b82a56d04badf5c66bf8f3e5a96878eddb1048f014898712d2f15bbf7ec457dbf1e66e3539415dfc7382c283b9f86d8f81d581f76121d3585d873e828aedeba8f26416f748d98d172e33a1e0ff5a1bce82ef252a3b07bf71e14dfefc4bd2ba7b06bf75e94370fb22b340be9ba464423b3f3
    de15f13c95c235cc1a649fbbc06a1d4d238f11bf770f4e5ebe078b740f6c59f200034d65883a9e07a390e6f09eddd877fc3cae9f3f8ea87dc731e06e9525c7a7905ba3d12f1dc3e8cbe941e35f90dea5152b56e0d9335187d03244d8a631054ab8011800d87f682f9796b30f1b85c4cc3c249fca9ff140f721df53f6a5ebec
    becd377bc58fd50f73d887d993a0fbf945760e535e1b3be79de472f7ce195ec9e69d6cfe622c4e5d28f52ac8bf4f19e859700370b25c6e3e705c4a0536df274df344fd00559f91af82f4ac6944ab4c444caaf59ee252b35565d71781ce2d5fc757e1d485abe88c2c63bfa9fbbfecc7a9d7e2d8c02ab5b4f6612ecaa5aa0168
    b2c0b0ab0ae6f21e29959271180d7ae1a3261a6e1c8e33c6077418fd6626f377c97d5d8a70031000b0ffd02a6b5a3822f4c2324331b3498a991e780d20974b5f62e91881f68d7cb190f3da79581a87a43dee31976b006f9655e0de1bc918fca358964f2c7cec10c6fbb4524a0ec773a83978ecef4fb35a41aa750f66b80118
    00f00fedd48c7d23c3a6e667bae00620974b4f306cbf83b157ceb075f3d52718fdda0966c4504da62f7cf1cd6503d05a0358d00bcda78f40bfe82acb379ab184a60de3707c0135078f7e358df5b31d1f0c2c374fd30537000100fea1750c95d0e823c03ea633a0fcb901a82e97343d93e633096cba26edcff3a15f5966db5c
    1b4441f74109c6be7dd2da75819a2bad355742301ea89172cd7704830198f477e7302a14fc381c7f32de3acc9a85e9ddf5d5889df1213d3b279bbde4fd6255bd319d411f5661f5afab0f11bb7011dc000c00b80138197351a7e8f24230322c55e250f699801b8093e592a610a33e7f1641713a232f620d2a591ffb66ac5f92
    c4e22633795f6349213a555bfb9af1cbbf7d0d11118bf1c1863429ce539cdd931dda4ee4e6574b1bced1875732256bd85d0d43d45de8179462ec87e73c6eea75c45c3700af6c4f67f938db9c5973662fa6138d6281cd07930a90d145e7920d4a1a3046ef2acd72a30c34782cf5d8312c7cff7dd5fd1468461cf235ea683f39
    6f3e9e9ece066aaaed27b755e4b580b0de9704370001006f0cc0caac28446555e26e6e2c6273ef0a4f7400395959c8ca29c540572d96bff7ef883a5581da8a02b40ce851559a83ae01294d56012a84f89c9c1c965e2f9d9348dcf41e0aea4780912e215d16724ac9979f085d73e1c285c8119473eabe9d0859f81eeae573d2
    798463283d5d53eddc933058583399eed705ac998c39165e768df9749a69b80138592ea9544b25caa9b03700f3221620a1bc1385d121286aaec19ab034c1b62ac4bb64880d3632c38ed6e5e33243dfc1bcd008bcb6309c9d4f69b4552685b173fc940cc2c56f22aaa804bffce710e17e3bb12e3ccae658ba6edabd41c42f5e
    8a9a41dbeb3a4ed784a521d1ec5af2759569a3c217a25add4a65f24b8ad69fcc7503b0f7c5383c5b724ddac3e14c131641e7fd2417a32f1ec578a7468a741f7b438b0c4032d4ec8d3392f7b0952b11f6f18fa355d8a6091794fbc940240390fc8eaa1ddf2eec0ffbebbfc6d53ffa2324a7a44c3202e9786e000638be10004b
    d37660475a294e468520adb455f80a0d40b0f710bbf62d54760159423c196c6c5b10c6f7dedb04eafe4af1594202abc127216f2746bc87abad7a76de823a713f5d33abb21e910bdf4262411da242dec385bc5484449d44ea8e852828bc82f736253a3c3773d429082175c2a5be7d64ec91cfb340f4d5c40d401503f0d3475c
    3470b4488b8a4044946070095b64d86d888e427c7609db5b921d8fa8b43414e557a3b33a5f48178fa2f26ac1162c41447c36ab798b8a108ea77586609cd1764494b586b03a3f4dd88e4049632596bfbe90ad3792d1a93856ae519497caeb3a4bd758922d9d6f70525a3a474444bc70479321d9e606a0fbc80660d79bd9e8f9
    efb1aa3381349565e3745933743d3711b9632fa28f4dcf0c341cdf73e3e265ac59bb1661e187d0ef86ab9c7b95b731fcbc0dd76e8b3e1cfd010d3a649e0d567ae6dac91503b05d086bfff11f61fa88601209e1fc0b2fe0cc9933cc68531a708e0cc047eded58fe7fff2f7a8563c78490271881890909364620370015e8175f
    85a5e539c69fea58805ecc147f41d753c370f03e2c8f270c226f0c408e7fe106a037066070c20d40cf2003f059ea3d8cbc700039b1e9930c40fdd3fbd8b1e738a2424371ebe175ec8adc8b98546e00ce568e1e38856d7ba3111b77125ddd0f11b97e2d7ef8e63234de4845427133929213702c72136a7af48859b7019bd6af
    c2bd5e0352a20f09c64d190e1cbf818cb0a558b07a0d7ef9c687d817b60afb4f9509c656b3d3595fdc812a2b46ff3499f5e97307570c400a5483b7fe9ffe096704e3efecb97336c61f0567062005d203eb4242580d62536babeaf1dc009420838c197e0a68de40c3de6ab6349d12bd651b136a613c2994323f288161db6d31
    2eb309fa753760d87e1bfad5e5629c90ce107b9fcdc3693ad3cae24cc2712c9d704e366acd0e32fcc8005462ffa1ed6a6c172775171e94b3409d4cbda9a6e64c0d3700b901e82ef46e7203d07d0c5dc318f9582c6a37e4da398216a96fe8c798791ce3a6e7a8bc528aeabb35b8dfd82bede5cc361a1afa3026f5911b6abb8d
    b8438770e6e24d688567dc70e3369e09fb2cda1e1c3f7c0885b71fa1e141adf0fc2d68a879202ccd28cc8ec783d6474813f61f4e3b8f8737afe050dc61d4f9d8d9b3e9423b7ba78dc76de7037786d5d092062ed6d5d5a1b1b191cd1a641f6866a17382f1d72a18706afb6fdcb8c1fa00aa1d4fc750ade1e6ad5bd979ecf753
    282f2fe70620a1660012c6a375e264ead23efd9a1bd6ce9bacb6ae7d04ba2513b579dab70ad8d21837319fadbcae4ca77be78ab436817efde412abfd87f6d1fcb3360fc91194e6dad75620747b2c5263b7637b9aca64f4235d28a8b09b13b1abd2da44ab6c9ae54c861b809e1b80b9db56a242d146ca9a7623a8b9769035b3
    a6a551536cbeb09e80effded6b888fdfc196b49fb03f9e9a900fa5a5b16388ec78b979781079f149c2b917db1c3f53d07bc90d40f719fd56269efe32c7d611b40283c188e7c3233c4c531819f15fe582e5769f38cda1f0ae0443a00a1dd2093319f4826dc2a695fc8d629acd6032005dc56ad8d9f74b707588b883fe0cf400
    d4fab94d65008ee8cc083dd3889557fbf0abcc7afcdbfe720c8ce8591a3200130bc4514bd4d7eeeabdbb78efbde5c84a8dc55b215182ad97859028d17f5e4b5529c297bf67d347ef44461a16846e6703443893e106a0e706e0bdb45d88c96f14d6c44114512bd6a34bdb84f56113033dc4a53cb863629007d159188d150962
    7fc1ceae4edb63ee176145549160243a3e7ea6a0f7d295fcf186b92697d4d74af33f53d0d7d3ebd0002cbb718b19816a8c5b8c6cde70fb758e638687871d068d4683eb4ef2db630c1666f88d7ef918caf2cb5c3aff743f4fbf5c4ff886934b2336b86486fabaabbd3fdc000c00a63200655afb342cc8509ad6ff38ca46e966
    65e5b0411f04197a14575ad542a95020acd7d6d589a3797372d0d2da6a1da57bf76e95222dc71e6e007a6e00062bdc00740f6a5aa3d1fffa96411b3f800e0d408b1eb17bb72074d356e8858f7561da01842cfc2dc28f5e43f189836c7d431275d33123656f2456efd98fa1ce4a44a75c47d1890358bd7a37da479f21e43f5e
    4578c2695c3b7514e1e1bbd030105cce80c9d07bfefc395b0e0e0e626464846d53a0757f1880c683f7d9fb417dead8f3341a90bcef20bab526e87a2ab027260d717b762174e54a54b63f179ea7f46c93ae233f2d0ae11b2251ff74102b549f9d19c9d1b1e8d15b505b108f84dc0728cb16f73f6cab47dcee9de279db865176
    3a498a6f40cac118ac59bd0ab71e8fa058214be5d66315693a4671fb5c1242d7ad45624611fa7b1ab027221c09d965e87b7815eb84f893d71c34158f99440f01dbef4811d30b370025c827172968c3811a8cf7cefce4d0ae1a80f64cc78726d8e106203700dd851b80ae632ee962f965bedd37c911b42303f04ee666acd876
    0007b7afc0fac329d8b6e918ee17a5604d549cb49e8cb00472216346d2defdccb838b3eb0f08d97d081bd61dc4dd4b29d8997113695b77a0aca1041bd61c44b3908f4f4782cf001c1a1ac2dab56b111d1d8df9f3e7e3dab56b2cde150390fa95d100031a68305590072218a3ef59bf6df2f3cc89de852bd54db85b988a5df1
    47b07d7f2e1a2bce61fd8e286cd994ca9e6de8d63d58b7e5386a4b52b031e99a8367273cef9dbb70b3a10585c776213dff12c285e74dfb9f345dc5d6e81cf1bc917b05398815e31b4bb0f7e80de8ba2b11197d185badb27408e1eb27a7d919730c3b228573b6b6206e570c0eef5c87bcca26b47576a3baaa12a5a7e3b12e32
    0b8eda0a67f29b1df406208d0026e7ac36b8daac2b41fd041d8dee7505b5e3ed3fb41df1654c5074ef148a86aa4a20d72994c698f8503a8b3ad56971581c118198b4226b131a413ecf42920bc50d0ce2f597be6eddc799801b809e1b802463e4374f76fbe214ade86c5929a3b395e950f273412ea9204e3522e4028a70d500
    e4f806b9065059f3a78c73c700548e3cb50f5319804accda3ed436f9def1bfbfceeb2edc009c4103d094df0ef38d1e69cb1663721df3fd438c3fd6304ffea4a068a42f613c741f9666d1858c6cc029f713fae51353ac68ff4d1c012c8f186608c6a62b06a0fca1f50d5aa46d9b874d09257606e01a5c284e4372612762f744
    e2e41cf8f0fa036e00aa18809f4db4994ec811b201985dd2c8d6c90974fce25f20b7492b3a5b967cf2bdf9cabf08b227f6df9bf506a0c12236f36c15bd07f88bd92e9734f72af95933ee9f9826cf550370b0ae18216bb721fe70028e1ddb873df105686e69a56e56e87fd226ac77c06032e2597faf357ef4592f9a9a5af06c
    d400cdb31e3435b7c3c0b2cc82ecdd07d022c41f5cf43af29bf5c8da7b00e7afdd44dfd028ba1f37e3c9c073219d111d2d8dd8bb650fba757a61bd1903433a8c6a34826163c0f0732d0c6363c26f18454b73139e6a02bb0f22c94b7373331b39aa167a7a7adc3700db9b90b8651da28fe5a2e151073a1fbb6600f6dfbf8295
    9b76e070fc7ee496d6ab3f4361fd60c466dc697f222d7b99ab1757656150384fefd36738b869e2d899801b8033dc046c691e6246197dc0c8cd8b7eed0d2117ccac63267544a6190ef4a1e56c160a32f0ccc59dec385ad23641a36868a088723f614c6f846e61290c8252935dc030f7311b2b5930df125d16c8c7cb38fad0fa
    02d999ad38f2525c17475e8ace6e3babef3167b6f236c7166e004e964baa45274526d7dc38424dde6c97a2a3e8f8a44c615d74b63cdbe590e613a59952fc3db9fcac964b1a08f06729b6856301570dc0737b76e046bbe8bd60f851b16070dc84aee716f6ee3b8a4d6b046360cf3aacddb61b078edf86aef736766edc8c88e4
    0a98faabb07be71ebcfbee6a1c399280d26ad191b061a41ed12bd7e0cc9d6e9c4ddf87b4f4321c3f781091bb0ea25767c2f1fd07b07d5b347a048bf1d8be7dc2fa6e74e9c6713474134a4a52b061c771a4a724e3c0a9d3a8bb5984f85d7b91943d331f79572179b97bf72eaaaaaa54434747bbaac1a0c4de007cfcb80d3947
    7663edc64814dcaa170c4039deb901786eef0edcec7c8a0b89e108db9530f919f6dcc4fe63d79112158b1ea305c982c1de632479b7b8210bf43ccc386a3d7666e006201f043209471f5aceccc30d4075b91cefd3b2420e29b4a00f2f1c644b32fc8c09cebb64f88a592b9796718c7eed042b7cdbe3b726e07113b20eaec7ea
    c56b51dceedb3999672b242fbe36001d85a90cc060827e3b3700393638fbd07266166e0072b90c4466a55c4a357f6ac61fe1aa0168d10fe378ec762c5fbe02676fb6497b9da3ed2ec79e44e5b45e165c2f28c6887b5dc0e70c242fde1a80740e32f0dadbdba70c948ed2ab1980c5c7a3b174f972ac58b5156d0e1fc838aacb
    cb11b333860dea99ad7003901b8093a0ccf6d787d6bedf5fa534af299b7b35220279d9a2135e6a2296e755253fbad414171f9f84cc4269ded6c222369f6bb0c10d406e000622b34e2ea730fe08970c40721bb27917dab5d2cc060377b065ef798c3d2a4168e826441eba8cc35bb6a0aef11a366edb856d078b601ebc8ba56f
    2fc0ae7d07f01f3ffa35562d790f1be38a703c2e117d03b7f11f3ff8158bdb105bccce190c90bc786b007ac224035078e6c95bd721fa4822524e5ec2a1ad9168682845584c3ee2f746a3beb90a5b4257e347bff810d17bf72372e77ef47003d023b80118a0f8f3433bd9009c70969b1df936326bee8bdbda1a2c5d1c2f2c3b
    b16547bcf5386d532e16cf5fcc3aee0723dc00f44c2e35c3433c78105c6556c9a50bc61fe14e13f09da2d3484a4a464dd7085aef142139f53c8675036868ed476b431346c7fa51539e8379ef6f40f231daf7148d8f9ea2b5aa4838ee282a1afb30f2a406d9572ad07cbb588a0b9e69e5485e02c20014cedf7c9b9e49129253
    b270a3ba0163a3fdec393e6a6c46ffe31a241f3d8a82abf75057d780870f1bd85471b3156e0072037012de7c68fd0b8d200e4156f9c4409760831b8093e592466e92221bfbce29366d2229b4b918f4eb2aa0fdc1395169cf90f35647cc1ab974d1f823dc310007ba5b5123145efb5d985561f8d91084efdc249ef775e2e9a8
    787c5f4f17cce37a343ea841637b0f1b253a6ed6a2e9e103dc7fd00af53aa7713c1b780a9334dfab3d8eae1b0890bcf8aa0f606767e794e1d6ad5bb67d004d16bf1898810ef31020e89699801b80018aa30f2d67e6e106e064b9242546a3e5830552d872ad45a0301be472bc6384b97a31ecaa92629ce3aa0178725b24ea35
    a24966e82ec7dbbf09c1b5ca326c7e3f04612b17e1e099fbb87ae608d62d7a0f074bebb16de17c1c3b9f8d88f9e2fefdd9e47ac68cd4988388ddb913bbf76e45d8e6832848df8f3f6c3d809ad62e766e5dcf0d6cdc9981f2fc146cdb1189dffe6e05aeddbc860d0b57e1e0d63024e49762d1c2b5389b7010abd76fc0fc0fb7
    a0f87c2c76ee4d425e6939362d988fe44b9534ee25e020799989412096078362816af3ada03100c9951cfd76f3cd99a969e6066080e2e843eb0b645f6c6fbeb582b97bf1065b171dcdf8e5dfbe8688c56f624736cdf7ea1eb3c5dd073700550c4052e0ae9462b5add05c59076de54e8c555f12221e61b42453dc27606abb0c
    8bc3ee3c4330b64db84a9a49b801e83ed6193e2e8aae565cc15503503fd08ab54bff80a54b96e3c8892424675763dcfc1c87d72fc3926521385d7c135b56bc8f55a18b71e074356e67ec43e8a124c4ad0f61fbb32b1e096733e3f4d154f491c338613d3b391559c7a3b074f152acdf9d0e9d791cfafe6a249d128d57795dbe
    ce07ef2ec5b5ae61a4441fc09db22c7c387f09566e3982b607b9c2fa6244a55dc2cdf47d581d7b1281d86249f2e23303b0a31947b7adc7ae232751dbd2814e9bed7674290c4082a6811b7d3983c9c7d8ab39ac3049efd85c0ddad7ceb342f3e8578e63bc73622ad7e9861b80018aa30fad2f6006e09279088baf60fdfc7e2a
    196d51e7f3b1262c0ddace42bcab70c0cb965d8a74a9a9787b439a74ae89fe84b201f8daeb0b99619919fa0e33345f5b18ceae494e7f0ba34350d43cd1b7705d7814db47fd096dcf15b87003d073035057b6df3a2592e9fe1e18471e61247b2bc64ddd182d4b82a172074c237518ce7c1fda92a5d0b69443537a543ac2d658
    9c49e8b77203d0750cd1f7a0f9781c2c6da27f365771a709d821260dee5557634817a4c37b5d84e4c5670660671b4e1fdc86755ba2507ab7095d36db8dc2b6ad0128e3d2f3e4f80c6e0006288e3eb4be40ae69d3765623bfbad33ad29746fdd22c0c516931e22090c146161f1f4f4e793191aea2822d693687c1c61244c467
    4b6716471313f9b9b9c2fd77224a4847fbc9b8db101d659d024c3c57143baf7c3fb6e70a5cb801e8450da080b1391ddaca1898596def100cf733addb86ca68984c54137896c519078760eeba34b1ffbe1837d37003d07574ef1661f44bc7d8c4f7eee2920168342025260efd460b5acb8f23eee46d141e3f84356b36e35ed7
    23ccfb7fbe8779e1fb712ee5208babaabf8be82d5b90766962c6118e8f0d40379a80957003707ae1066080e2e843cb9979b801e89d0138175035002de318a71aae19eae0157072a93363f4ab69d0fe24578a701f570dc084ed5b71e94625b263b722bbf42a36aede898a9bb7d0d1ff1c897bf6a373f001c25789714d3597ed
    fcff710892176f0d403a47575797eaa00ffb40e9ec65941b80d30b37000314ca6c6e000626dc009c2c97343276f44f9331de4c73a4ce6dc60774acbf92e6bfc63323500ea32f1ef5fb746fce0824b9345fef667d9c683e756ff0491330c725485ebc3500bd853fcfe9851b80018aa30fad2f98e86b27faffa326d8dcec3436
    3f2b41cdb37233306b9665cdc3cd58f1ca77312f3a9bf5dda3a65d6a021699f02398bb6d252a84738b4dbcf118a466e1ec5c96be5a6c77b61e4bd74d4ba326e7c9d775964e7658dd2839b056a69dd8c792fa056e00aacb25756636eca966b563733a4456590dddb1af9d60c6dfd8df9fc6c84763997b131aec3013048a5cea
    175d85e6330918ef1993623cc7b51a40231236872131ed04323273d1d8d20b83f0db35bd03d05bc670b7b2024d9d4ff1ece93334dcaf407d7b0f061b2e6079f851f4f4f7e25645053a9e7a7fafb31d92176e000617dc000c509c7d68bda526731b1b9031782f8d0d0491076130e3adabc6662048d48af5e8d236617dd8c4a0
    90ccd085282463ce8a6c000e62d3bc0d18d4d660debc687197b0effdb7b609465a13d685c5db1c2b9f8f2dedaeeb385d1396864c9c9bae6b7f3fa2336be5fdf9166e007a26976a4e8e677b18cd6dc06859fb445cef53e83e286646e1f3bf3886e7e5ad36e93d09ae32d372393e6c607dfd683e685fe1721fc0fd097826c599
    9eb721eec841a49fbc86a39b57e2e0f174649f2944ecbe38f4ea4d381613878ef66bd8975c898efa4aa446ed13d25c637efe821992175ff40124ff7e533503d37ed90fa0126e004e2fdc000c50bcf9d0ba8b6c60f98789dac19962fca90efac557a52d11dd9b056c49a3131d618c9bec7284e2e859dcff30d3e18ba1761c5d
    9fee632aecef5389a57108e6625b07dc744eaa959a2e9ccaa5651cc683f731f6ddd3ccd79bb279742e04cd27e298a36be600da30f588526a2a2663888ea526724b877b2360dd65260d40534613fb9da6ac6629c637f026e0e983e4850f02092eb80118a0a87d688dc71b583393f2a3e48f30f8dfe371ffca4d74777733056c
    3299d88b3a9d1f145fe2cc00346688cdd8a693cdd0afbb01c3de6ae8975f677186ddd530c4de874e38d674a695c5c90660d5bad3ecd9688ed74e79dcf8a811da5773597f28ba17e3b17ae85797c37cd5b6a9d07cab97a5a325f466e8c32bd97deb3754625c639c1000b52636db06eda3fb6706a090de107907fa55656c09a3
    059647c3d06fac14675c10f63bbaae3ba8c9256188bacb64c728fceeb98e29bb55747cbdd2f58104d464cc9a89853cd2fdba80d596f99a19310075668c7d230363df3ec9d67d8d6b06a001974e9fc3a041780706eb90752a1fd7ab267c0d9a9e3722b7b849dae23882e4c5d706e0e3c79d686fba87e307b761fd8e143477c8
    f1dc000c04b80118a0a87d68e9e361108c027f43d7791e7a15f7eeddc3b9c44c347ff900ce86c43181b87af52a5a5a5aa0d3e99861186881148abdb1ead400946aeb744b26f6ebdeb9c296ca9a3c795d3600ef2dc962cf667461b1f55ace8ed32fbd365103281863967b03d0878806a312f93e8d476a616911fb998d778d32
    c34d36000d076a6069129b062dedc362bf34218efa9e511a0a74ad4935864eaeeb2a6a7249908f37570ca2caa425782b224fda9a80dc0f79d46fb3390f5ffcf1126963faa0f790de134fb0dcee630e60ad46a40bb589ae30dd06a0519039fa0da61c72a2ec1f5ced0398bc7d238e669dc4c9e43dd8b8230a51878f61d9afd6
    a0b8a04c38fe260e67dcc689a848b48e8ce3c8da0d08db188ea6210b8c430fb1372a1d7b6362a8cc14d490bcf8de00ec42cb831b888d0cc3a6a84cb4720330a0e0066080a2f6a16506a0a2b9cf703305cf77fc0d4c9db6feac0c95cb317a9fbcd5eba049fb7b1807bb991f356dd55958062b3194f0e718b97969c2d75a5f37
    3b8eae49a569ba4edf5fa7e2f97f99a86decfc970c742d3c8feec5f9a87b3b03d75edd8fd21fc5b070f5c73178f0ebe378b2285fd87f714643cf924be84dbc85a1a121f6f17015669c495f00ddfbc56ce908e58776acf319c60da2129beab871ed841f34e5ba339ca653f9624d755e57afeb0835b924ec65d311b20118f1d6
    b7109a5983253ffe22ebaff9d6b73e82bc66207ef18ff0ca9b8bf1dadfbe848863c7f1c53ff9169ab498949e060cbdf2f28b483a7e6c660c40e1b7d26ff616d38576683e9f84918f1d6273a27ae34266ba0cc0f1d661683e9b08dd1bf95eddaf2bb8da04dcd5d601bd702f16fd105a5bdbd0d6d585abb967515059cbd2ddbd
    9e8bf6be015c39978d7bcdfde86a17d3c362c4c1c82de818f37dede56c83e48537010717dc000c50d43eb4f61f59737d3674275e87a547547232b20168192cc550da1f60a8df89a1fc8318cbfd27e89e0c4193f557100cea3092f257d0d767e1d9994dec38ba26295cba4ed76fcea0e76f8eb1750a0fe38b515f5fcf6aff5a
    5b5b55c383070fd8bda6a6a6223a3a9a85c4c4445cb870812910b5637c1ddadbdbd1d3d3038d46c36a04fdc1747d68031135b924ec65d311344a9b466b538d1f391ecf4f8b62a3c31b4bb24527e0b2f37072123e28ac47a58186f3d8a4afb9c7467a474589ebf2e8f0e9c45706a01263c243683e15cf46d0529f3a77f1bb5c
    9a2cac2f2319aceecee8e129ae1a80dd4df771edfa1d8c590d5233f24f9ec153bdbb869ddd71e32634d435c0689395e3e8efe9855eff1c8fbbe78edb2392176f0d403a476f6f2feb3e3455a074f632ca0dc0e9851b80010a65f62403f063875853a0bf617314ae2f67b568345aab7ffb750c5d6c1404c5008bc5e276d0ebf5
    cc382b2d2d456666264e9c3881ecec6c545454b0df45869ada719e067f0a2a319d0620f5ad0b24d4e49270d5009c2bf8c100b422185a34d0c45db732fe944bd6e42ddc8f29af4d8a991e5c3500753d15d87fac1c89611f20363d1bcb576dc0ae75ab9078321b8b168422336e23a28e9cc68af5db101d198d275a1392f74663
    53c83c1c12d22f5bb511a784347b13b2b12a2402ddac3fe3382a33e3517c3d1bdb522b70273706fb13b35172bb1a9121cb70f26c3c220fa460fd92f5488bd9867dc712f0fb796b917d640b228e9cc0bb6f2c465a421aba66894143f242794d86995a78f6ec19aefbd940e306e0f4c20dc00045ed436b793888e72fa5b00f8f
    df8260fce97e7b857d84e81e948695afa1735249909a02ce9c3983f4f474a6e4af5fbf8eb6b636b79a70fd05f5c9b3f6dd93984e03d0beefa212b57bf3376a724990ec04a301681f4cd92d520a1f3166627ef5e8dce47cdaf2c07147497fc825d54ad2b50d7b67a620e2920128a4294bdf895fbcb51e09a99918d09b713e3d
    13897bc3f0fe8245d8955582de07f95834ef43c130cb43d3954ccc5fb4004bd6ec45cab10c963e2fe324ea6fe4e0dd0f1660d19a7d784a034a86ea917a5a2c705f493a82ca3b97b068fe42ec4ebd887b3987b13c622d8ee7542275c71afce1bd95b8d15089f4bcfb303cad456ad629ac9dbf086b76c462d00f8363fcc5f0f0
    309e3f7fae1a464646b80138c7e0066080e2e8434b90522c29296106537575f5a40763d68fb27e16fddd9de8e89dec47acbfb305cf947d5ecc6368686887ad9ad2a365529c1bd0395b6c5d96b8c3e0e0206a6a6a909797c77e674646060a0b0b85fb6cc0e8e8a894ca3568f4ada55ef2122618b684b22695ad0b1f011a59cb
    f60b41deaf34b2e451bef42c1efd5d127b36a331552cffd58eb50e00513baf742e42f7f665694d446d9f324efb6fa29f35b57b23e4fdfec0915c3223c1050370db5bdf423c790a97a0a65d6acea56660e6083c2a8a35ffc6c70b4b6a121e6c44547c3c6b16a679aba92f6052e5a0e4685c8c4b58f10a5e7cf915d644ac8cf7
    27b20168e3eec607fdf89c41b38c38732be34b03d09824187e344865d9845ccd04aed600fa8671f43de986c1cffd1a03196f0d40ead3c7fd00ce1eb80118a038fad02a395afa08eb4f95234d3090a89f9d6c1875b7376058cf56d1dbd184a1e7436868ef166cb26768e9ec6706e0d367cf9881c6cc216600b6a0adf51134d6
    3e33b606a0563384b6e606d60c607faede211dbbe6334149d89cb3a90366dd109a3a7ad9397c01fd46ea8b48794246211987e7cf9f67c622198d6a900b157d683933c40c31c2075a30c48c994dd08755c0b0ed3673af43a88dde25bf66fa255761697e0e637a23740b4bd113518247dfb13500d58eb55f12d638e95c86fd35
    18fb510e8b9351dba78c931dedaadd9b72bf3ff0d6004c0b7b1d1fc4509f3dc1c03f158dafbe110a6d532ebefaa3c5485af26344e435b3811e64e4bdf5ad2fa2f2661efee45b6f61504a4306e0c1e329f8e24baf0b67003abb848f495114bef556043b8f32de9fc806a051c86f9223196ffbf1b90a0dc4207f8b740fb25b19
    5f18808162f8c9b86a001a076e232efd362ea61e4144d8222cdf9188075762f10ffffc2b5c2828c2e635abb13b2117e792e3b175d34e2426c66113a5db9e8081d69b581bba12db12cee168f421747b39506a36e30b03900f02993d7003304071c500ccbcd58375e79ad0231860f4e2feffdb3b13a0a8b634cf1b3dd53313b3
    44f444f42cd555bd4c2d11d55d5dd5d5133d51331155d315d333f5baaaab5fd77bd3fd5ed9efbd7abed27a8beb73792e088a0b2a0ac8268a8af23445509145455011dc5104451164932d054c36d97283e43ff73b99176e26379324c9840bf9fd224ede7bcf3de7de73cf5dce3fcff21daa2dcbc8b09b2719e8ed82c1d081da
    e7b5e81918426f97015d5d5de8ee1bc4605f378c569b107506830146b359dad78b11ab51daee7688be11744bfbc47e13f9dbe31bad23138e352889463adf846376f749879196bd03e28881840a0a6a36be79f3a62828481852b3327d64a899d99f4dd8fe2868c96c0bd50692b326cd1ddb796e05e0570ed86b3afdcd2c9979
    990c5900ba45fa9361d9593a23d3c309b332dfd149c22d01b5ef9cc68b9afaa93d97b651611a88849f25ced9a2c06ce3ad006cba770acb36a420212a4ef4ef3bba2f0e2dfa32ac5fbb072763b62029ed02f28beee3d05e7bffbfa3fbe47e80fb11b53d14272f5dc4da156bb13d228605a08af823373501a8c78bea521c890e
    47d85e1d1aa4ed46a76d16805a8005a046f14600aa41f1e8c52201447de902351276ae40c28f4605539e646565897ca1828484a2affd0cfd2100e72aee9e4b73c83d2120666b1edc99c456d1259a7b4def3b37ddbb85faf12d2d168271b27e7cd381eec5fd88f3e8fdfd64297d0760d9ffc8637334cddd3cf4dfd285499791
    c2c0d698facacc360133fe16804725c1b7452100c7b759006a0116801ac55701a884e29c3d7b56081faab1639c91fb195213b2dccf90f29a9a983df5336401a8fe5c5233240d5820414162673eba81df3b0ce33b977d9ed62d90d3c3b93e979614f5e668cbfec742c01a7f7121203392f813af04a0d58294a80494955e4668
    78029ed4eaf1e0e645dc7bfa4212c00328cebb88ca175d68d3eb6131f7497ffc3ad1dfd18ea49844b40ff5e2faa58b78f85c7a8e45d80bd8b0763bda8d7d225efe8d32586d7de361e639dc041c5cb000d428de08c083576bb1f2641986ccceb57c6762d6a0a06abc6079589483c4c44421721e95970b316830744902485a52
    33adcd2afcba0c06c9af4734e152b3aedc544ccdbb64cac5e0083360b4aa37234b4b43572face641d43daf44aba16f2c1c2d4538c7ba488314d67f0db3fe83c41f0d36a14127723f436a5ea799514834b2009cde1f13c68ebfa78773fb5c0edb60fa55fe9888a57eaf73056f05e0977ba3919f7f12fbb3eee054e2617448df
    445d7c22f6ec8840e3e02892376ec3fd7ba7f0f996e3c8d37d89d87367713cf600766f5e8d2f73f371bde8010e45ee87de6cc3d1bd7bb021643b5acca3484f3aa808a3b433383f99ae00243a3b3bc5b77e3247e15cbf9d2c00671616801ac59b82f6e49d16ac2a6ac7cfa38ad1f06abc9f5db16e3792726926907e34dcccc5
    b2dd2760d6976059f8515ccf3a22044d4e4e363a7a06d05aff5c1290f611bb34b083067898fb0c686a9384200d1619b042ffa24a7c182a1561e48124b50d2f858833f57688412134e88446188b3866fb886343a7410c04b149ffbe6b1bed710dd24e3170640e59e0a7c2889a8d95c290ec1952e144f72710a672b4060bc0c0
    e08fe9e15c05e0f0f5560c7eeb84bd06f0947dceeba99895d102b3d504dc5159808debd761ffa9a2400dead624fe1080d38105e0ccc20250a37853d03e7d39885ee983ee0b349a373b3b5b7c5469583ee33dae052d3563b8f633a4c138346f32852103daf30516808167f872b34fd3c3b5d5b5a0eafd34f4fdbb8318f8f609
    e9384d8e3dea389995f9698ee813a835bcad01ccd1d9edff3963c3a5f4f3e895f2ef5286b41c092225e7232c00830b16801a65a60a5a122f77eedc11a28566e670ed93c14cc455007a7a314868533f4332d343794c8ee256555589e9eae61a2c0067166b8af49cb8312b33da3e044be83dd1e792ec1176acc8475156814f1f
    6c27b332ef5fd14cdf406f05606aec01317ad7dc71176ffd7421d67dfe19a24fdc82ee500a3a876dd025a5c0f0aa046f8b7d4bb173cf3eec3a74cd71144686056070c10250a34ca7a08d59f31e6e349871e3c46ed1fc8bce4758bc26060ed380132838ba0d470baa45e75cfac8669d3f87eaba2674b4ba188c6604531180ee
    181a22db8b13fb19d25c9cd43746ab4c5700e646ac836c073a3762072a8cddb8909c22e6071686a0753a14e695a3bba648187426e3ce3545d7a0d3253be6fced16fb694e6079bfddf873b2b0ff475c08df8812c7c6f871f428bc5624fc8aae154ad7609f73383993fce434dc938e7d0d6b7ff2232c891d9f9798d2467318d3
    71a4d3cd0a23b7da30f827e373730ffe492aac894f00c52c13fe782e8971b3328976c3e53e3447fb0b6f9b800d8d55282e2a427553173a5baa85a1fcdab63e585eb7e2fe933a98a5e583a775e86ca67dc5a869d6a3a373eefd010b342c00830b16801a65b282b65ffaf06f385f8375375ee157e9d5782bfe0e3afbed124f5f
    7206bb8f1e4748f8519c8909c1a1a4189c29d1e368f8623138440c12b97f1f8bdf5b03bd148504e0d66ddbb0212957c43fb5773974e7f38528c9cf4cc5f3c636a7fe7ba2ef9f245e6850c88b568388134cf8aba05543ee6748267ca8c0a37ba09c3779b66b68a72b005bafc5627726f547ebc6faf7d649bf75d8bc3245125b
    15d818aa9334d735fc46da8e59bb197a632d3687a68c093afbd21ebe467a2e33498d49f1962c89b51fdc8152002a8f4386a257fc7623aeb51a91be619910a2d762c3a4a5230d8eb4c8f1290c8595c9dcf301d22b242129095012a5ad9278a57557441fbb7f9964176a7f948aa1ff930dd39242613b900c470fa7563b39b217
    4876f88c6f5ec4d09fa78dc5a59a3f1a296cd95b26a6811cc34d3fbe403c977273f4c0bf3e18d0594edce1ad006c7dd104f3c828464c5dd2776adce281b9f3314e64d13476a368acad97f4f2cca67faec10230b86001a851bc2d6869f0877200881d338a733250a9ef973e80f5c8c829b6d7fef5eb45dfb49ce232fa3222c7
    e15f5f568cb2fa4e9415e7e05ea55e2ca5a87876af00b71f3c122224373717bd035261386286dd58b4dd50f4846e3741402005a03bd4ec192afb19d228ed9960ba02d03d46e862c2b162e142e8023c8ddb7c42d98fcff03f74b899763960cf254da938d61c9d51e7f00d2c536d0236b6ddc5aeedbbb164d90e149f8d47e8fe
    447cfed916242567217e6f2cb6adfd2d4e5c2ac2a64ddba08b0bc5d1cc22847db14d1885665800061b2c00354ae00a5adfa066499a59e3dcb97342886809124754334685050db808b4a31ababcbc3cd184dbdbdb2bc4975ab899721d1d1d282b2b1b9b37995c4141019e3e7d2accd6b88627e3e0be8e58d6da73c98c6378d0
    00fd778fd86b06dfcd83ed7580fe14d84661d9f550d4548a594e6e04ee19f0b606f0f2e1ddf86cd94aa49cca40c6994c9cbf5a0d4bf77364a49f43f6f51a149ddc8b6d91a9d29fa66c745b467025eb021a9fdec09a75ebf0376f7f8a57e6f93f82df1b580006172c00354a200bda0be14bb16443383e5db244f4a1525293b9
    1b0ba929ceb1ed0a8907aa752291515a5a1ad087c21b48f8d1478bf2890a0a9af62dd0aeaeae4e4c644e02900c9ad2bd510b37db8efa743e7bf6cca99f2109f8dada5af141f76596181680da85ee85fcc11ebcd53cde8fcf47b3325e41cdd12b6f0ad139f403ff9b95f156003a338ae6fa17dcdceb032c00830b16801a25b0
    0250ee23d58d5ddb6290be619110846f2edba2e8ffa4f45b8adcda8992b0a1a101e9e9e962268dd91ad14a0504d548521f39c63b68d4370944aa0d9c2a2c00b58b52002a3fd8be9a95992aa239faed3c2106fd6556c65b017871ff2edc7c41c6ef2d381c1e89882d1bb076cd32acde71049947b72136f33632e3f662fdda4d
    28ae6ac3f9f82d58be7a2d324fc5e1273f5d88bb0d7df60306392c00830b16801a2590056d4d51a618d1a8933bb03b463b8627673a3ab7bbf17303893f32734262b0bebedee13b3350014162e6eeddbb0e1f60a83a1f23d599187e9c06cbfd5458ca331d7b5ea0f7c822d0633c529788d7578f62b8310bc69238585fb5c154
    fc1e7a74ff2cad57093f635996083bdfb87dfbb6789e5800ce2fdc0940259ecccaf8135b63bf5fccca782b00db4a2f60fdae38e874f108d97a1849e12138785287b53be2d1f3b20431c9a7b06d75084eea4ea1f4d953ec09598f9369a7f1a2e109d62c0b41adc1c3072e886001185cb000d42873b1a0a5343f7cf850343516
    17178b8f77a051138084adbd127d513fc6706b85c387181780c6ab6f63a8ea21fa53ff02e6ea0cf49cdf065b530a7af3e2305c1d292d133194fb3730bdecb5479d47b0009c9f782100c718b6d9fbf17de540c0fbf109b3327f76ca27b332de0a40778cda4c785656091377f1f30a1280d4af999e215a27477fea69c90270fe
    c10250a3ccf582969a65a9bf190d1ca1791f03859a00a49a0d51e02c709ec87f361c19e835fe6dae30b4ab155800ce4fa624009528ccca04a21f9f92918296299995f15600d6e61fc7ce941c3c28b98c359f47e259759de803d854d7808607a7f1c1a73bf0a4f229d2742770a3bc513a700f72d274389d7b03666b37b24f9d
    44b1e46fed6994c29cc4c386715332c1842cfaa85bcfe2c58bb166cd1af17de51ac0f9090b408d12c88236397419ee38da742733944b4670a703898cc2c242512bf8f8f163bf3f44ae02d012552e0ab2d1ee99318be20de6d07b224d5a8105e0fcc46701a86026a787f3c6ac8cb702b0e8e01e6455bc927cfa11b57107f66c
    8d82de6a43e2ae483435dd44cce1db38171d81dcdba5d8fac526848484a3716814e94949880c5b8bac1b0f51f1b40eb5755528483d889d0917e765f78fc920f12737f952d71e799d05e0fc8405a046096441dbaa273b6b467cf6f95a8f8672954670fd018d9aa57e82972f5f163361f883090230fcbe93d832242f8661cfcf
    d0b9e7ef1d3e1e187e81c1db6963eb43f7736029d90d5355168c55c592672fac8d4fa57d6da28fa045df20f999602e8b83a92e1f8399ff8481b27c115d896b9a661b1680f3137f08402533363d9c07b3329309c01bb74a50f6e8291e3fa9f2c9dd292b47858a7fb0ba8aa79eddb9ac4bb048f724504cf77eb29b9a53bb9f2c
    0035c07c2e68e9df2419962643c664aa643a4c26005f85fc189d2bbf8ddebd3f75f878c284a1ab3b41dd85461a8f63a8ea9924004361e936c1723f0256a324108bd261be1d064bbf49c420ffb175492c0eab68661680cc4ce06f01a8643afdf8a684c2accce00f4ec3fca8c3a1006418c6bfb000d400c150d0923162fab053
    f33089125fa6399b4c00fa03ba17a3d697301685c0a46f73f87a0f0b40662608a4005432d57e7cbe42cdd1436fd99ba35ffef754e424a5b100649800c302500304b4a035b6222a7483e8fb77e44289c3732ac873a78e3399a998c9686d6d15fff0b3b3b3d1d3d3e3f09d1c570138da69c2c07f3a2a0a8de9ba9e0571685b10
    85170b76a166c14e69b91b2f17ec8361c17eb1af6f41bc6a3c27f73b8962695a744da44f0bb0009c9fcc94005412e8e9e1e426e0f2ec5b68f9d364fbbb14c8e66886097258006a804016b429a1bba077ac13e313e3af41a1be0eeffedf353076dfc32fde8b00a4e5b20de9c218f4913bad636148004e6640da174c2613ae5c
    b92266aea8acac74f8bac755004e0fe9da7ff8a610c6d59d360c0e0ea2beb61e7dbf6b1771c2fd8b4474fe753a7ab3ab84807a7efdeab484ef6cc002707e321b02708c004d0f270b406513b0a7e6686a4d888c8c444c4c8c935bb56ad58ccd973d57b050ed2d2dc3ef63b4cbde8d65aa503cf38a1b8e2defb1d5f462e4baf7
    737ed339bc4da32fe9f1063abfe9e3eb62299c9fa75a94efc754ae3510b000d400812e68cbf37442e8e4d1c4fb8e11bf76c3d0dd28545992c00b8b8d4172268d1476ec53188b16a389a5a5d26fbad05cb624044910923054231002301906c36d84c55cc1a33085f8935cc59278fcdddfae447ff3352c5d9f86dcad76e11bb3
    6519cae788126401383f995501a8c48fd3c3a90940252377da9d9aa08f1d3b26ae5da6a2a2025bb66cc1810307c4c0b3e67bd7b17af96a2cdf168fe4bdf168f3720ee091fe1758f20f6fe2c8a5a70e9f712cafee2332360d77ca5b1c3ece583acb712cd35eb8fbca70f60b58f69609379cfb42face0ec392f444ec13628a04
    b77904963d0f61fee2b658c26a83ed451f2cfbca61de5202d3d262e127633d5d83d1412b8cff7459d4e4d2ba8c6a3ce9f8b44d02c51c5682d1012b86251167fc59ae74fef12a055b639f3ddc8e07228e6aba6401a8b24f9c67fb03711e6baa3d5d740e914649184dc80b89e133753087dc8525ba5c8c6257624dafb5efdb55
    6affc3407e5f568b7565ba09b5b032746e357139218e9b7be39a7794c7e6ad52fe7e2a95a9d2feb1fb31c9b5061a16801a800bda71babbbb919595250a00d77cf0af00ec46328957c93d6c194443492e8a924af1aa5e8f82538938f44904fa7f27010ffe2e031d1dd5b89c5382aee7d785d82dca4c16c2317016d4fc070bc0
    f9896604a082e94e0f379900748504605757174242428493a7a8247f1280c3a66e543fbc8a0f3f0943f49e7d6819b2e1645c1c2222f6416f1ac5b10ddb7031fb281292d2b0ffe87124a79d81d142f93882d4d8836869be8dbd876f60b8e3012276ef4354ca6d8c48026fdf9e18ecdb178b98e3b7c5f96a6f9cc3c62f36e117
    efac80fe65090ea63dc0c9d858b44ae748dd10868d3b23d1326843e99923d8bb3719450f3c379f53cd138909d911a39d46983ebc0aeb01bbd8b0245460a4483f168604042de59a365aca7109eb41bb9855ab01548b673d5c095bfd6be137aa1f146267b4c73c51140ddbc47d27013972a7cd63bad4f689f3d43a1be037afba
    399646b5bc30ad1c4f8369d155c79a1de53ee37b05f6154970d91e77c2bce6967ddb816a5807747e3501a816c7f5dea8e51da55dce6342be1f935d6ba06101a801b8a09d080d12b975eb9668e6a102810691f85700aa43f782ce4d76b05a1ed5e2f57f3884cebf3a09bd5e2fee11a5632ec102707ea24501a8c497e9e1a62a
    00af5fbf8ee8e868ecdfbfdfc9edd9b3471ccbd2df8d9a9a1ab4770f60b07f002352160d4aefb5f42541535d2d3a7b29df86d1d73388d161237a06ec691c1d31a2b9a11e6dafbad13f6891b6cd62d9dba94743732bfafafac5f64077076a6aebf0fa750f6a6b6ba4f052c12d9dc3f0b2017d46339ac5394c63e736f6bc92c2
    d7624088cc49908495b2064f407e2e8c1a871d6b8161c2f1dda5cbc5cf53ba54f749224d895318b573ba6e2b994a3ea9849d14b5385339a70b935e6b006101a8010259d05e088f411d35e3ead2456d5779ab1e6b7ff2232c891d6fc22503d034b02339391df7a4a54e978c185d9e889f992c37f14e1c0c32533436360a3332
    644ea6aeae2ea0025086841ed522e85b5ad1fd67a9e8fdfd643457d68b5a065f4630cf162c00e7275a17804abc352b335501c830ccf46001a801022f0065f1665f8e0fe21837002dfb392d9f14626d4c217223c86ff604a08c3c6d11f5156c6820c3ccd3a14e12bf1784f01d17bcd2352ed9264431f5f11b1d6a41e4e6cd88
    3c720eaffedf39f4fdee01345fbe810b99b7f0ec5a81f4d28c0b65ea6719a38b73caa3dadc4464e4652031d73e117f6b799e10e117328fe07ffdf04d14d5d439f5af1ceb733926d68d63716a7c6c6fa67e519d9d9da2709d2a2c00b5cb5c12804a3c99956101c830330b0b400dc005ad77503e0d0f0f8bbc223148139907da
    3d7bf60c67cf9e455151119eafcb164d5a353bf38500a5798fc98c8d5a3c2d38ca23d1174aca335f5e687e2eb5cb5c15804a946665ac19b52c001966866101a801b8a0d52e742f6864726d6dade87fd87ceea168ca6afb4dae28acc8dcc45c2c7cbd819f4bed321f04e018645626a254989579fdb5a3a848bac20290616600
    16801a2090056db9ee20568487234e57e8f0f11d77c79aae61682d2317b454e347fdffa856ada5ac16affffd4174fef0d49c1d1ce20d2c00b5cbbc12800e440d60531b5a7e651f3cd2f3bd348f6665a8d0a241200909094e6ee5ca956e4d49051bcad1acae2351e73b74ddf2085b79d4adbfb13dedc248a17de4b4bbbc55db
    a7957bc102500304b6a0354217b104db8e142137629da2cfdf52e4d61a9d8c393b1b7b5e0adde36e24af58858a3171377e2c35c3d0f311d7829606808c0d0ef94e2a7afff3613457d9c5e15c1a1ce20d2c00b5cbbc1580ca26e0f3ad1ecdcac8e65e641e3c7880eddbb7e3e0c183c2bfe1c615ac5bbd012bb72720795f02da
    4cdebf9f2303f578ffefdf47dd807224e7084e1f3a86b6ee26dc29f33caff9505b15367fb1161bbed88063974be1afbb636abf8ba814679b759e50daee23d1610ebf3fc1dedf04db7c326eecd9a9d90c743dc604fb8032744c85dd3fc2123f6e37d112f3c8be948e43e7219b7fae36f4d4ece5598f54c272e0094cd27187cf
    374cb0b12704a05161b3affeb5b359162fecfbd1f59b37deb5a7fd748d3836a56da4a4634cd0a98691f689f4ee2c1523e26d7576332fe2fc2a793793b000d400812c686b8a32c5208222318ac06efb8e061b8cd5da298d392bd6e5fdcada3da76329c28e19869e87a815b4e4a8e9b7bdbd1dafdeca1483439aae3dc1ebd7af
    457fbbf942209f4b667a04850054340193591912815470ca9000a43eb85bb76e154e1683b230b45907a43f67b7f19b8f370bdb7dadc20e603c764544e3a50938be611bf27253b03f210d8929c771e8f41918ad523e8e0e237aed12ecd81b8285bfdd8b63fbe385dd4012805f261c96defb07d8bb271ad1c7efc2faf21ebe58
    be0951c7efc0da711f51c7c836a00d69bb23f1bcd73ef0cad47e0f51476f3bc28620eee41d7c199b88e6d612ecdab50ff15fcadb52b803e790207d57c3d67e8cf51151d239e8b8a5d8b57b1fa28fddc5b0a10cfb0f9f43ecc6dd389c988ece49cc98286df78d890e095a0a61a2629b4f66327b761e8f21a54b691f5046d5ee
    9f2408ed2b92385c7553ac2a6bec94e724d4ece529c3abd9d893fd463b8684d0336fbb2fb665bcb1ef47d729a79d966453514e9bbc74178604aa401278e6cdf79cc2bbcbff998005a006e08256bbb82b686949a655c8106ddb9642514bd191522aa6949b2fcdc1fc5c6a976013806a9089a3f8f8782426263ab9d8d858f147
    6cd8388097fa97e8ed37c16c348901c72629af6c929033b4bd44dfa0457ac847601c344b6ac6820193fdcfdba8cd0aa3a3d6ca3a3408eb883dbca1a75f1295837865e884510a6b1ae8c5cbf62ee9b8c3d2b6558a675fca0cf41aa097eed380c53621ac488f147e68c8a8d8a6f30ea3afab1ded862e18c5be61477a8631d8d7
    65f73799d1d5fe12afa4f4788517b6e53cd9acf3c99e1de1e9bc8efc1d83b62711b34e78714dc4843491000bbde7d87041edfcdefab9a216c6437abdcd637fc30250037041eb1f86f39a44d5bd0cfdb39aec1f955c85af44e9e7aea0b5876917cdbed4df889a80a9d6c1d711b79321378d28312d2f16cd066ad7e00ff8b9d4
    2e2c001986992e2c003540200b5a65ff3c7b73aeb39d39fbfe6e248f35fb3aef979b7ad375b9634dc15a859a3a94824fae7ef7845c15af44e9e75600aac4a373cbcd2dfe46edb86a4d3bfe8405a0766101c830cc746101a801664a00dad75d8d422fc5a28da10a31e8bc3f3d623d1e4bf163972c1c3b8e56214164892a17fd
    3dc8197f71418823592089fe27d53d222cf56d71ed9f614d7a025bddebb1f0b46c3e791f652bd2d1724d3a9e748f46ea26f6eb90e32905209d47f499d14f9c0fd5bc7a7c4e4ae35bf6c9cca9e3b06836909ce8844c7e8a70a60fae38d6c67115804ed7f7b853a453f59a3da44d090b40edc202906198e9c202500368b9a095
    67a278efd33068bc02500822b51a405920d1082dd347d784d8b2a43c1bdb2fd79ec9a24ff6a32509c0c2dc7c18fe310b83eb2481e9211e41a3bc487c0e6737d847bb91d07ad225f6c958d36a605a560c4b7c058cbfb40b40b9933221af2bc30dbd9123fc94b80a40e5f5d108344aa7da357b4a9b121680da85056070417797
    fa306ac9b942cfa0961c33392c003500653617b48167b46d10a6c585420499165d9db47f2041f7a2e8741e3adfc9c6e0e6db307a194f2bf872cd32fc5c6a171680c145d8d54e7c9a5e87da17cda86e985df7b4ae09ff26ec398c927890a9aeae465353135a5a5a66ddb5b6b60a9340f3cd2c57206001a8010259d02a8d372b
    4dbac8289b8895b8f3279cf7c94dc6f393f958d07a0b0b40edc20230b82001b8e26c3df4adcd686e9e9a6b696916cf4963937d5df66b6c6c9c10d61bd7d0d8ac2a00bd3a9e24d09a9b1a457a9ad4f6bb7194deab17f3f0bcb14975bfd29108bc7fff3e0b402f6001a801025bd08e1b6f1e136edd35080f5f81df883e801bf1
    db8d2b41a6fd5c0d411fb9d36a3704dd5d81552b92c58090902d31f6e3e82bb0315427795d13c7718d4b46a663b62cb30f2499212c34b9bc846b53f07498aca0952dc1d3f95c9b64bd418ea3863fafc31758006a171680c1856f02b0050d9597f1c5fac3d0b777a0fef14584ac5c8ff7dffe35762666a345af578933b9f355
    00b6b6b6e078e846e43cae479bf4fc363736e0cbb82d58b6e8d788d51dc37beffc1a2b7ff30e22d2ae217afda7f87cdd7aa4241cc28a15cbf0d9ea08ec08db8187f58d685139b6d2b100f41e16801a209005add278b36cb059f4eb8b4946e19d7247ada02412532431e7c11074799e4e3a4e8c935f51663262743a14e6958f
    8d1656c6a5fde1e1c9705391e877a8df9bab057835abf1b2957932f869d53d17424b168fd62fab45df38b29c4fd0bd28ccc9c7abcdd7c53db21c7a2a5debb030724a064265132c935adc5740d6ed85d5f968290d721f40174bf4132cd9bb5aaa9f0158006a171680c185af35802dcd8d3818f105566fda84e59f7c8273593a
    6c8fcdc5addc18acde7a144d5423a712cf93f3b906503a57d5ad6c7cb86809366d0a41d481042c5dfc5b84aeff18cb3784619b94ae86473908df7702e12b3ec2a6b0ad3812138e4f576cc6f6a84388d8b29305a09f6101a801b8a0f50ff2e009a505784f56e3699bfac611633571e6113182d6bcc63e02572e689b2e9463e0
    e7391869ea837967e99860a4638801189358dc57a2b43a4ffdf2c452c512bdd375a8ec0f34fc5c6a171680c10509c09592006cd73743df32bb8e9a927d6e029e01c702d07b58006a002e68fd8f93657532afe285d57819655ca782b67f70fcc550b3f43e95f3a8855339e684eb9841f8b9d42e2c00838beb0d43d89c6fc0a6
    fc4e84ccb2a3346c9304e9b06228b0c1604055559510825a71f3e19d08342c00350017b4da653e16b4dec2cfa5760906011859cc0290610289658405e0acc305ad766101c8cfa516998fcf254da348736b3f7efc1879797942049e3e7d9a1d3b760174191919c8caca12736b53f3394d6dca027006e18256bbb000e4e7528b
    ccc7e792aec162b1a0afaf4fd404b6b5b589eb64c78e5d605d7b7b3b7a7a7ac4b7c4660b6c572316802e7041ab5de85eb000e4e7526b04f373c930ccdc8505a00b5cd06a171680fc5c6a1116800cc3cc455800bac005ad766101c8cfa5166101c830cc5c8405a00b5cd06a171680fc5c6a1116800cc3cc455800bac005ad76
    6101c8cfa5166101c830cc5c8405a00b6a052df9d1689c9974cc445800f273a9455800320c33176101e8825cd0d2543a8585852828281076b084bb94874b921bdb0ea0bb78f1223b17979f9f2fee09dd9b601580fc5c6acf05f373c930ccdc8505a00a6405bfbbbb1bb5b5b5282b2b13d6f0d9cdbea37b41f784ee0ddda360
    839f4b6dba607f2e1986999bb00074033577d104d664119f3eeaec66dfd1bda07b12cc4d91fc5c6acff173c930cc5c840520c3100cc3304c90c10290611886611826c86001c8100cc3100c1364b00064188661188609325800320cc3100cc304192c00198661188661820c16800cc3100cc33041060b408661188661982083
    0520c3100cc3304c90c10250059acf333c3c1c870f1f466565a5c337309c3e7ddab1e61d341f2ba54d765d5d5dc2bfaeae4e6ca7a5a5899909944cf51cfe60aae78c8a4dc457bff57dfcc137bf873fa0e5b7fe42723f702c695bf2ffe6f7111d9fe4880131f93e4dc5a5656622efe57c98c9fcf0f6ba6262621c6bd3879e6b
    ba46ad505454e4363d5abc17d36526bf8b73859e9e1e1c3f7edcb1e51d33f96c308c275800aa40a26ac58a158e2d38adfb033a9e2cdc0e1e3c2896dea28c2bb366cd1a180c06c716b074e952c79a9da99ec357a6735d3192b0fbba24f294ee0fbf2d09bf6f7c17efbeff11feee97efe06bdffc73114ea6a6a606d7af5f776c
    b947793f5def6d20984e3ef8923e391fbccd0f774ce5dcde5e973ff39aaeafadadcdb135fbb4b4b438d6ec28f36fbaf7622accd4fbedfa7cf8f3de2aa1e3caefcf4ce2cb79293c89e2a93093ef29135846ad737bee6f16802ad00bf6c1071f8817953eae478e1c11fe1b376e1cab5da37f7d05050522ccf9f3e7c57a757535
    d6af5f0fbd5e2fc2b86ecb283f34f231c9515862f9f2e5e2b8e4424343859f0cc58d8a8a12e9923ffc1497fc525353f1f39fff7cc2bf730a17161636e6af96769ac8feb3cf3e43474707222323453882c2d2751054e0eddbb74fc493f344c974ae2b3a36115ffbd6f785a35abfbf7ee39758fcf10a9cc9ccc6fffed95ba2f6
    ef6b540318375ed8d171929393c53ad54ed079e8c32a7f5ce51a52e50753b93ed9b5252525899a5525729eab5d9fcc74f261b2f4b94b335db35a7e506d8d1cfef1e3c7224f94d7a864b2732b51bb2e396f56af5e2d9604bd4784a76b56e61fad9bcde6b1e3aba14cffc2850bc57cbcf40748be36392f5cefa3da3e77f189de
    de5eac5dbb56ac537eb8be33ae28f34fedfc9e8ee16edfc99327f1fefbef8b3c21285f28bd04bda7746fe47c9f2c1fd5cea14ce764d0f505f2bb285f87f2fd91517b8e957ef5f5f513fc94cfbbbb674289f2bc6a7929a3765ef91caed746feaeefa41c562dadeebec3841c4ff99c29514bb3da7baa0c47fe9e9e4bf273f7ae
    503c39fd6adf4fc2d37b3f97b1bd7e8dd6fff855347fe55fc17ce79ec377eec1025005772f98fc8122060606b061c306f1226cddba55bc6cd9d9d9d8be7dbb78c19e3c7932615b262323032b57ae141f20e531e5f5f4f4f4b178376edc107e326a1f4782ceffe1871f8e150e4ae4e3d28b4969524b3b515b5b8b254b968875
    190abb6edd3af1f2529cbebe3ef132cb85a492e95c1709c0af4a02efbf7ce37bf8c5dbff8c0f3f5985bffaf14f4593f0d7244128c4a18a00dcb2658bf8f050415d5555253eb21f7df411424242909898e808095188cae990d727bb365ad2b612f9186ad727339d7c203ca5cf539ad5f283c2537e5041404d85cac24a0d4fe7
    56a2765df292ba212c5bb60cf1f1f178e38d37849fa76ba67d749e888808217808e5f15d51a69f0a2582de09e5b529c3c8db6afbdcc53f75ea147ef4a31f093fea7641f941f9e0faceb822e79fdaf93d1d436ddfb973e7c43da37d24bca8b0a67b4bc281f231212141c495f36ab27c543b87329dc4bbefbeabba2402fd5d94
    8fa37c7f64e8b8aecfb1d22f252565829febf3ae764f9428cfab9697326ae7958fed7a6de44ffb95efa41c562dad84da779850a65ff93d9399ecfecbeb148eee0db9070f1e8874b87b2e95e7747d5728de6465039dcbf5bd573e53f31d5baf11fd47efc1f2c8f9cf8e566001c808a87059b56a95636be689893d80af7ffb07
    f8ba24f6fe50127bb4b48b3e1280e32e3a6ebc099861820dd7423f98a1ee008b172f166264d1a245aa7f8c671b57413419b3fd1d66bca3c734825ef38858ef3b7407ad7fbc1daddfd809d36d459fe0111bf4ff733f5abebb07cdff753bcc0f9dbb8c680116800cc3100cc3305e90d73080af1facc4d6939568fac75464fcea
    18cebc790827de484443710d8c653fc160f10298aa3e71c4d02e2c001986611886095aa80fa36b9f5419a375d0b166e766cb25bc75ee4f61b81909c3c2ddd02f3a8533b1c528bb5a038cda60a9fc352c777e0f967af78383a8b6fae5cb978eadd9830520c3100cc330414b7e7e3e0aaf5d736cd9a9ed7e8a7f38f71dbc93f5
    977853127c0dbd558e3dc070e33e984bbe0963c52f313adc2ffc2c2f3663e0ee0294d5fc5bfcf2fc5f62dbad8f85bf1a34e887cc48cd362c001986611886095ad40420f1dadc859297d7a46537bad7e5a0f98f76c2989b88c1577f8cc1e605182c5a00ab3ede1e786400239dd968ef7d80d2b662d8466d767f155800320cc3
    100cc3cc32ee04a09261fd6b742dcf447fca7dc0bdb6f30a16800cc3100cc330b38c3702d09fb000641826a0903dbeab57af3a395fb1582ca8a8a8706ca9f3faf56bd1997a26b87dfbb6309aab457273731d6b0cc3cc36fdfdfdb87ae50a4e9e3821841ed92fa46f476b6bab23847b01489327a49d3a85331919aad33ed27e
    b2bd7bfbd62d9c908e4f267f6c367bf520d97ca4b864cfb3b3b353f8c9c80250c495be6564b7313b2bcbfd4014a3511c9bae21efd225714d2693c96d786f6101c830f31412809e1819b1dbb15243fe887982e22bc33537378b8f992beecea3760eb283e60a85730deb8b0074970e4ff920e3298c6b9a590032ccec43e26a4b
    5898104f4a689b8c6f9fcfcc74f84c14805fa6a6a2ece143c7d63864b0fb5179b9630b08d9b4098f1e3d726cd94997c2c4c7c539b6ec344ae251393141e5d3a758b57225da544602272624e0f9f3e7627d58ba063a07cd4aa484ae61cfeeddc8cdc971f8f8060b408699a7b8d600cad3365d92fe41caff484958d10c08f441
    2147b3c5a80933da270b1b3a963c8303d50cd23f5cc255005ebc7851fc53254840d1345304c5574e57289f571659f44fb7bdbd5d7cf4e818321487e212ee0420eda7e311ca345fbe7c594cdcaf1493eed2a764b2bc724d33219ff3a15480502d00417e72ba1886093c67cf9e45c93df569daa83583de6519a500a4efd8f265
    cb10131333c145474763dfdebd221c11161a3af60d91b979f3268a5d9a77e94f6242bc63b08804d500ba8691191d1d457454945817d7505222d65de990be37998e6fafafb0006498798abb1a40123ef23f4a123599d23f6159d4b8abbd52ee2391a5145ff279686606770290906bca5ce3bb9e978e411f615f04a0528851fc
    2b57ae886ba4e66982d2209fcb5dfa94789b57729a09a53fa58704f2546b2b1986991eaf5ebd428c24d8d4a01975e85d96510a401260dbc2c3274c7fa986af02f0d9b367a2664f3a99c3671cfa96e464678b7583740d3b77ee14ebae9cd2e944b3f1746001c830410ad5dec9b561fe826ac4e45a3199e99e47ed98934102cd
    153a869ac8f3267dbe5e03350fc9b5800cc3cc2cf4ce522d3e3597d2dce4917bf6a0a0a040fc99bca668f2a59ac2d2d252c7969da6a62631df3689488a1bb56f1feedeb9e3d86b273939194343438e2d3b8fa577bebcacccb16587be3d549b2743f33d9749619e545420323212717171226da9a9a9aac293fec8eedeb54b88
    485ae65fbe2cfe5416497f30a7030b40866198004022b4a1a1c1b1c5100ca32d5800320cc3100cc304192c00198661188661820c16800cc3100cc33041060b4086611886619820830520c3100cc3304c5001fc7fbadb736fa9a0b1500000000049454e44ae426082504b0304140006000800000021008594bcdfd900000003
    0100000f0000006472732f646f776e7265762e786d6c4c8f414bc3401085ef82ff6119c19bdd6d90a03193d20644f4662b78dd64a74968763666376df2ef5dbde865e0f11eef7d936f66db8b338dbe738cb05e2910c4b5331d37081f87e7bb07103e6836ba774c080b79d814d757b9ce8cbbf03b9df7a111b1847da611da10
    864c4a5fb764b55fb981387a47375a1da21c1b69467d89e5b6978952a9b4bae3b8d0ea81ca96ead37eb2084db97e7b94d5eef5a5deaadd327d96ee2b2c88b737f3f60944a039fc85e1073fa24311992a37b1f1a247888f84df1bbd54a5202a84fb240159e4f23f7bf10d0000ffff0100504b030414000600080000002100aa
    260ebebc00000021010000190000006472732f5f72656c732f65326f446f632e786d6c2e72656c73848f416ac3301045f785dc41cc3e969d4528c5b237a1e06d480e30486359c41a09492df5ed23c826814097f33fff3da61ffffc2a7e2965175841d7b4208875308ead82ebe57bff09221764836b6052b0518671d87df467
    5ab1d4515e5ccca252382b584a895f5266bd90c7dc84485c9b39248fa59ec9ca88fa8696e4a16d8f323d336078618ac9284893e9405cb658cdffb3c33c3b4da7a07f3c7179a390ce57770562b2541478320e1f61d744b620875ebe3c36dc010000ffff0100504b01022d0014000600080000002100b18267b60a0100001302
    00001100000000000000000000000000000000005b436f6e74656e745f54797065735d2e786d6c504b01022d001400060008000000210038fd21ffd6000000940100000b000000000000000000000000003b0100005f72656c732f2e72656c73504b01022d0014000600080000002100c6b5e6a422020000670400000e0000
    00000000000000000000003a0200006472732f65326f446f632e786d6c504b01022d000a0000000000000021009ee4693ee8dc0000e8dc00001400000000000000000000000000880400006472732f6d656469612f696d616765312e706e67504b01022d00140006000800000021008594bcdfd9000000030100000f000000
    00000000000000000000a2e100006472732f646f776e7265762e786d6c504b01022d0014000600080000002100aa260ebebc000000210100001900000000000000000000000000a8e200006472732f5f72656c732f65326f446f632e786d6c2e72656c73504b050600000000060006007c0100009be100000000
    }}}{\\sp{\\sn dhgt}{\\sv 251658240}}{\\sp{\\sn fHidden}{\\sv 0}}{\\sp{\\sn fLayoutInCell}{\\sv 1}}}\\picscalex100\\picscaley100\\piccropl0\\piccropr0\\piccropt0\\piccropb0
    \\picw1067\\pich744\\picwgoal605\\pichgoal422\\pngblip\\bliptag517907953{\\*\\blipuid 1edea5f1b5a67ba24b0d15b335165747}89504e470d0a1a0a0000000d494844520000003f0000002c0806000001a51a507c000000017352474200aece1ce90000000467414d410000b18f0bfc61050000
    000970485971000017110000171101ca26f33f00000bbf494441545847ed9969939c5515c7c70571031414d9658dfb565aa29f44df5a58a628520a58c23bbf82
    6f7ce137700f8228498ca60063204c984998ccc264baa767a6f7a7f77d3dfe7fb7fb364ff7f42c4c8600559caa7f2fcf73efb967bbe79ef33c33fba51b84fb84
    fb43f8a2709de0e8a19ffdf417562816ad97aa5ba15ab352a361bafe99c1ed999923a552d91abad8d92c5ba7d7b54eb73b36e00e1b525737a0f5d539067c6a70
    7b66e643c24727f011617ff461e14e21ac01b84570743d6bfef1afcfd8233f7fd2d241c18a6f6659ff6181c983019de5a875fa5dbb7061ce69a1eb3ff403ae63
    00849a9e74fd4b02c23b42e2492ddcec3071811b1fdb03981f8623ee1037ee0e826028c0eea4b15f173e2d8c985c2f1ce16624b66ef566c39ad5a675e732d695
    c2afbd36eb26366305b3be63800170e3480d183ce806359a56cf95add96ab9499d4ec7b28592bd1149da6a34a6df65187c5fb8491831e0c72785cf0b77ec81db
    042663afc3238c8165b1f0a4d527b1cd854ce6c6e70476c964cc85c1ae420dc27c4cff1b9dc5f6491a0f93910d607033378e3dfeb41dfdd1a36ed0e3477f658f
    1c7bdcfaf98605da8d8554d10a959a359a2d182009523b82c12d4cea096df9ddd1420c975b3f51b35c2e6fc954ca2cd3d06ec9c10075b63368c9f76dc500dfec
    187d3806fd7edf0514796027064e855e0f19b46a79104410938362d9dedcccb8202a962b30b85718a524bc70c370fc889acda693244c302b168a302098c60209
    6ec43637c251370db8fb1302928f0829b8306ddf4f62db569e460c0803e607c1249f5d8901488777d898e48b1b054c7350b069e1012fcc86a9bd6063c405cce3
    32c2d067874ae24be4701420c8363720159a7f56b89f09d168d42e5f5eb04c3a6dc964c231d9951461fd66d7fa8afd6924bedf15c81558c45b6244fc21a922e1
    1198f4730d4bce462d57cc9b55bb56abd51ca376b9616f5e5ab25c226bfd78cd6db07eb76fe54ac5dde76c25dcd7ce2f5ae9f5b8454e9cb3205540801f086c40
    5c83b23b0be03889921796ad9e2c59355bb2f26ada6cab6a6d1d1597fef7ba59ae69fd74dddaab7997325e39f7ea48c814692344c3ddcf31b2a700370b230138
    4e9289a4b5f59d59dcb2465d67958e9c30a171afd8b4643c69e974c63a559dcd058d29769c1595dc2c93db9f05b8c8cdfb86bc9d002eafe9bb2213635ac07f0f
    7f8d3416fe066112dfef08770b3e06c682d06f4122142b30f088c0f1fd2de1db070473e1f190408184821f17a626232e6009b623ee4018b625a7d7d5001ef0c2
    c2f0668d6d8b4f23061d26de1f342935e63a282679ed487e2102031f11a1009f1d149ec7ae3ef70b3388c82460d8221c2044eb41c17c1a1b828f60f6428c118b
    7383e8641285005b8f0383647110506931ff2ee1560141a66e39a441b29b8639e2d049bc6f17b0026e18698f143ed9b823976c452a25a31d1689f70302c90c25
    c716c7e4f8f97606b2f8e6e686653319ab94cbd61b7688bb913b2575e4ee44e2fd1501f3a3e4b6c5a94aee1c8eb5887a95c79e7cca8efef898fde49163a3dcfd
    f413bfb6a3479fb0477ff994fdf637bfd3915b552559b16cb164859a1ae152d5f2ab592be85ab15eb7a05275f3c49b94fb0581c5b1b4a3f0e27731b09fa95b23
    5e92f69bae9172d5f770f1d252c2a2cb57acb29cb67a6f50d2a6e637649ddec855a58dc0f20b5b169cb86c1bff9c7363c4fb1b02814ce4efbc38d4ecb46c4d6d
    6026a78242ff756e0daecf6e9a2de7adbb981bb4bb2a32d6b792168fc7ddfd442261993762ae3da0daaf487b48bcf7bf78ad50b5d64ad26a9992d5e345eba664
    be46d74a0b714b5fd9b2eeac34bf22c1ca6d5bdf4cd8da5a64304fa6cf17d49f0ea9523dc0e268158d44addded58f3fc9c75d355ab4b8b56a72d655546e91caf
    cbaffd8d8ac5244c438507662f968a9a23f3d3db08c5d2a0f412ef3d171f051c8bc7a2ebee37ccca899c751b6d6bb7dbee1a44b50365575296d1cec866b25255
    112ff4b398bd6a8de178f1de73f1d10318b424785ce35557f9541b1009ef7dff88239b2fb9462c9d2fdbfcea96ad46142bf9a27640d9925915a722f1fe9ab063
    b423d16d6ea48845d192c5588468e71afffd755fc54e2ba94098c49be72f3c4920c58ee57724e1a2eb537723164618ba47aff94e14a8314e6dad594f82883735
    3d7dc3588683f8c31148eec5341c0c5f15be294cabd3f6036a39e67f59e080416bb22856c6da23e20fda23150250d7230487c1b4d676bf603e29959c4e4ca120
    8a8e2d0e790118800b88015f0c5e0de0033f4e33f86f5bd81337900c3010135d2de0e379eeb8f02431f0b0f001bd5df296f36e0b0377be573029db81bd1e5618
    c6c4adafe2c9066c1e40a6066ca8770b5e062f13328203edb549a5610473d214dd04499a3448ce2485910e0167e6b506eb2203e0a922e994e6c3772bde18e811
    8e86a914561c4f3319a551980568fa392c1e14382a398438afa9500185c3b5825f93f529cf79c0c1c1788fc0d98231e89648f544eb9e06e0e2a4e258d3f515ef
    1792bc1802231019440206988c80310a7b9d81840d136170ef90af2ba64e9e3c69f3f3f3f6d24b2fb9df2fbef8a29d3f7fdece9c39638b8b8bdb0aaa6b4d9297
    d20603d07713016c579ce95bd61d95c73a8409d6c2eb9428eec55498aad59abd70f2b49d38f56f7bfec429fbfba953f68fd3a7ed4fc7ff66172f2d0c470da8a1
    02f0857f9db6675f3861c79f7bde9e79f6793b2efce1cfc7edec2bafba31fd96aa539e2ca6d575a404b5401634552b0faf256b836b2aadf722c9cbcb31b6035b
    14e711fee42d5fe1a0e7184d2aef439e7d3e7a74eaa9d56d5bb9ae2e556d759bf6eab5c0ecd4a0f150e53fe6fd96aae0f685b4755e8e5bfb8dc03291a4b5d49c
    1a6f02a558b73a684299b1b110b32db5648954c692e9ac355a2ae785665bdf8abaa646b56bfadee4cd50d7aad98a156259db5adad0f8c1bb4bc9cb2359f20139
    80c4480413c944f4be9527abf3a865a07c4ffd42ba667d79a11ecb5b792563ebeb0385c344131456be5d6b5a697ecb92af47ad1595c66a6a415f4a345a0deb76
    06deece75bb6be14b3b3e7ced9e5cb4b160439d79f80b4bab45c36b0d5ffccd9f9b3af5a642562d964c65aab6a941a3dab946a96d27848f2f2409ca47888ca87
    a81e54ac73296ac913176cede5058bce2e5b6665d33d72a8af05d6cbd4ac97ac5abfd472ca97cfaddbc6998b56b998705d7fe75c526da6c636e4799e0ba8ddec
    ab398f6cc66d7eeea2eb93c21d633299744ffecbd5413f2ceb3a6778a249e74d002479df59e5e98ba3c9b45d8945f47bf0c600515afd8ee5ab65b7252ab5ea20
    e4855aae6cc17ad27231f5daeb096b97141d4b79ab9dddb0cee5c0ed77a2251a4fd8ecec0545cf789348340d1ac8f1578f9eaeadf212a4dbedd8d6c6a6bc9252
    f8cabba9bcd517e2b6f5fbff5a23511cbc9995f7181b7ee81026e611f6ecfdde7ac932cb29f73a2693c9ba50efd45ad6cb37ad5394710a4debc9481d4555b7a0
    ef7cdd3a8122a726e3369aee150c2479d9f357adbc4f780f39ae21f26119b9b266d1e8fac023723d8f71eacb19295236db5422547e686a3fb63b3b28ef8c38dc
    f3020f425aadf628624ada3217d75236bf12b7980cba19d1f6892a5a1a6debb795580526d61b2d4b65477bfe618184c723627fd693edf7a53c8338eaa8eca896
    1e705c4384d0411058b158b452a9648542c1f2f9bce58b05b72fdfda8d4a785286b1dc1f8d0b81843646ec678f314e617aeb214d38b94292f77b02551fcf4ca8
    4cc3471d3aeea83c964179c284494cbe67c877445ef95c2e3752a25229dbe2d28afde599e7743d7046e13a63b2d9ac95752cf29b6fff1be36190b021b90ed2e9
    b4bbc6f3387fdf8fe5e191a76a563924c80eff39e509794a70a296ad4b1453e4e0587444d76d3419fa789f90b975c8f7c0446813c6bcdd04fcf6ff7dd8bf5dc2
    e338a1a93aa025f82356f212ee1467beba9b0cf95d950f1b80088001fb9f288069f8750d2f1cb0b2076f3ddf6984d7637d9425c449ce243894c66978dc2bbeab
    d73d71d31b014bb14f10024c880418620c9803f202867937c0da0039d8a2c8857c382cdcceeeeaf16914368237048c100680f12430d2b5c2b4f5910b19c30a7ba5f7adf824f9c91e9ee97b0d9372820f683acdccfc1f7e15d6090d8cc5690000000049454e44ae426082}}{\\nonshppict
    {\\pict\\picscalex101\\picscaley99\\piccropl0\\piccropr0\\piccropt0\\piccropb0\\picw1067\\pich744\\picwgoal605\\pichgoal422\\wmetafile8\\bliptag517907953\\blipupi149{\\*\\blipuid 1edea5f1b5a67ba24b0d15b335165747}
    010009000003af1100000000a110000000000400000003010800050000000b0200000000050000000c022b003d00010000001e00040000000701040004000000
    070104000800000026060f000600544e50500601d5000000410b8600ee002c003f00000000002a003c0000000000280000003f0000002c000000010001000000
    0000000000000000000000000000000000000000000000000000ffffff0000000000000000000000000000000000000000000000000000008080808000000000
    00000000000000000000000000000000000000000000000888888888880000000000000000000022222222222000007ffffffffff00000fffffffffff880007f
    fffffffff000007ffffffffff200007ffffffffff00000fffffffffff880007ffffffffff000007ffffffffff200007ffffffffff00000fffffffffff880007f
    fffffffff000007ffffffffffa00007ffffffffff00008fffffffffff880007ffffffffff000007ffffffffff200007ffffffffff00000fffffffffff880007f
    fffffffff000007ffffffffff200007ffffffffff00000fffffffffff800007ffffffffff000007ffffffffff0000000000000000000008888a888a888800000
    0000000000000000000000000000000000000000000000000800080000000000000000000000000000000000000000000000000000000000000000000000a110
    0000410bc60088002c003f00000000002a003c0000000000280000003f0000002c00000001001800000000000021000000000000000000000000000000000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffff
    ffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffff000000ffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ff
    ffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffff
    ffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffff
    ffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff0000
    00ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff7f7f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff7efefd6e7e7e7e7eff7f7f7ffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffefefeff7f7f7efefeff7f7f7f7f7f7dededeb5adadf7
    f7f7f7f7f7f7f7f7efefefefefeff7f7f7f7f7f7f7f7f7f7f7f7efefeff7f7f7efefeff7f7f7f7f7f7f7f7f7efefeff7f7f7efefeff7f7f7efefeff7f7f7f7f7
    f7f7f7f7efefefffffffffffffffffffe7eff7eff7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffefefeff7f7f7f7f7f7f7f7f7efefeff7f7f7f7f7f7ff
    fffffffffffffffffffffff7f7f7efefeff7f7f7efefeff7f7f7efefeff7f7f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f7effff7f7f7f7effff7f7f7f7efefe7dee7ded6f7ef
    e7e7e7deefe7e7f7f7effff7f7f7f7effff7f7f7efeffffff7ffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe7e7e7e7dedeffffffffffffffe7ffefdef7f7
    e7fff7e7ffffeffff7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f7f7fffffffffffffffffffffff7efded6efded6f7e7
    e7e7e7efe7dee7ffffffffffffffffffffffffffffffefefefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe7e7e7efefefffffffffffffffffffefdef7ef
    eff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffefdeefefefefefefeff7f7f7efefeffffffffff7fffff7
    fffff7fffff7ffffeffffff7fff7effffffffffffffff7f7f7ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe7e7efefefefffffffefeff7efdeffc6ade7f7
    efffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffff7e7ffefdeefefe7eff7efefefefefffffffffeffffff7ffffef
    fffff7fff7effffff7fff7effffff7fffff7ffffffffefefefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffe7e7e7fffffffffffffff7ffd6ceffe7defff7
    effffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f7ffffeffff7e7ffffefffe7dee7d6d6d6fffffffffffffffffffffffff7f7f7ffff
    fffffffffffffffffffffffffffffffffffffff7f7f7f7f7efffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffefefe7e7e7e7fffff7fffffffffffffffffff7f7efff
    fff7f7f7f7fffffffffffff7f7ffefe7efefe7f7e7e7effff7ffefdeffe7ceffefd6fffff7ffffffffefefe7cececeffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff7efefefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f7f7ded6efefdefff7effff7eff7fff7fff7efffefe7fff7
    efffffefffffffffffffffe7d6f7d6cedee7deeffff7ffefcefffff7ffefdefff7e7fffff7ffffffffefe7e7cececee7dedefffffffffffffffffffff7f7efef
    eff7f7f7fffffffffffffffffffffffffffffffff7f7f7f7f7ffffff000000ffffff000000ffffffffffffffffffffffffffffffffffffffffffffffff000000
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffded6ffd6bdefd6c6deded6e7e7deefffefffefdef7ff
    effff7e7fffff7fffff7ffe7cef7d6bde7efd6f7efd6ffefcefff7efffffffffffffffffeffffff7ffefe7e7d6d6d6ffffffffffffffffffffffffefefefefef
    eff7fff7ffffffffffffffffffffffffffffffffffffefefefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffe7e7dee7efe7eff7efffffffffffffffffffff
    ffffffffffffffffffffffe7ceffe7defff7defff7d6fff7deffffffffffffffffffffffffffffefffefe7e7d6d6d6efefeff7f7f7ffffffffffffefefefefef
    efe7d6eff7efffffeffffff7fff7effffffffffffff7f7f7efffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffff7e7fff7e7ffefdef7e7e7e7fffffffffffffffffffffffff7f7f7ff
    fffffffffffffffffff7ffefd6f7e7ceeff7e7fff7e7ffffeffffff7ffffffffffffffffffffffefffe7dee7c6c6c6dededeefefefffffffffffffefefefefef
    efd6c6e7cec6cee7dee7efefeff7e7fffff7fffff7f7efefefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffff7fff7e7ffe7d6efe7e7e7f7f7f7f7efffffffffffffffffffffff
    ffffffffffffffffffffffefdef7dedee7dedee7f7eff7efdef7ffefffffffffffffffffffffffffffe7d6efffffffffffffffffffffffffffffffffffffffff
    ffefe7f7ded6e7e7d6f7efd6ffdebdefcebde7d6bde7f7eff7ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffff000000
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f7f7f7f7f7f7effff7d6ffe7bdffffffffffffffff
    ffffffffffffffffffffffefd6ffe7c6fff7d6ffefdeeff7efffffefffffeffffff7ffffffffffffffe7dee7e7e7e7efefefefefe7ffffffffffffffffffffff
    f7fffffffff7fff7effffffffff7efffefe7f7e7deefefefe7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffe7e7e77b73737b736b736b6b6b5a6b6b5a6b6b6363b5b5b5ff
    fffffffffffffffff7f7f784737b7b6b73736b6b7b736b7b736b73736b9c9494ffeffff7effffff7fff7f7f7f7f7f7f7f7effff7f7fff7f7fffff7f7f7f7f7ef
    f7efdef7f7e7f7f7f7f7fffff7fffff7fffffff7f7efffffffffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdbdbdc6bdbdbdbdb5bdbdb5bdbdb5b5b5add6d6d6ff
    fffffffffffffffffffff7c6bdbdbdbdb5bdb5b5b5b5adbdb5b5adadadcececeffffffffffffffefffffeffff7efffffefffffeffffff7fff7efffffefffffef
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe7e7e7e7e7e7dededeefefefefeff7f7f7f7efefefffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdbdbdd6d6d6c6c6c6bdbdbdc6c6c6cececebdbdbddededeffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000fffffffffffffffffff7f7f7ffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ff
    ffffffffffffffff000000ffffff000000ffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffff0000
    00ffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffff000000ffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000800000026060f000600544e50500701040000002701ffff010000000000}}}{\\rtlch\\fcs1 \\af31507 \\ltrch\\fcs0 \\insrsid10555431 
    \\hich\\af31506\\dbch\\af12\\loch\\f31506 home }{\\rtlch\\fcs1 \\af31507\\afs28 \\ltrch\\fcs0 \\b\\fs28\\insrsid10555431\\charrsid11666074 
    \\par }{\\*\\themedata 504b030414000600080000002100e9de0fbfff0000001c020000110000005b436f6e74656e745f54797065735d2e786d6cac91cb4ec3301045f748fc83e52d4a
    9cb2400825e982c78ec7a27cc0c8992416c9d8b2a755fbf74cd25442a820166c2cd933f79e3be372bd1f07b5c3989ca74aaff2422b24eb1b475da5df374fd9ad
    5689811a183c61a50f98f4babebc2837878049899a52a57be670674cb23d8e90721f90a4d2fa3802cb35762680fd800ecd7551dc18eb899138e3c943d7e503b6
    b01d583deee5f99824e290b4ba3f364eac4a430883b3c092d4eca8f946c916422ecab927f52ea42b89a1cd59c254f919b0e85e6535d135a8de20f20b8c12c3b0
    0c895fcf6720192de6bf3b9e89ecdbd6596cbcdd8eb28e7c365ecc4ec1ff1460f53fe813d3cc7f5b7f020000ffff0100504b030414000600080000002100a5d6
    a7e7c0000000360100000b0000005f72656c732f2e72656c73848fcf6ac3100c87ef85bd83d17d51d2c31825762fa590432fa37d00e1287f68221bdb1bebdb4f
    c7060abb0884a4eff7a93dfeae8bf9e194e720169aaa06c3e2433fcb68e1763dbf7f82c985a4a725085b787086a37bdbb55fbc50d1a33ccd311ba548b6309512
    0f88d94fbc52ae4264d1c910d24a45db3462247fa791715fd71f989e19e0364cd3f51652d73760ae8fa8c9ffb3c330cc9e4fc17faf2ce545046e37944c69e462
    a1a82fe353bd90a865aad41ed0b5b8f9d6fd010000ffff0100504b0304140006000800000021006b799616810000008a0000001c0000007468656d652f746865
    6d652f7468656d654d616e616765722e786d6c0ccc4d0ac3201040e17da17790d93763bb284562b2cbaebbf600439c1a41c7a0d29fdbd7e5e38337cedf14d59b
    4b0d592c9c070d8a65cd2e88b7f07c2ca71ba8da481cc52c6ce1c715e6e97818c9b48d13df49c873517d23d59085adb5dd20d6b52bd521ef2cdd5eb9246a3d8b
    4757e8d3f729e245eb2b260a0238fd010000ffff0100504b03041400060008000000210007b740aaca0600008f1a0000160000007468656d652f7468656d652f
    7468656d65312e786d6cec595b8bdb46147e2ff43f08bd3bbe49be2cf1065bb69336bb49889d943cceda636bb2238dd18c776342a0244f7d2914d2d28706fad6
    87521a68a0a12ffd310b1bdaf447f4cc489667ec71f6420aa1640d8b34face996fce39face48ba7aed51449d239c70c2e2965bbe52721d1c8fd898c4d3967b6f
    d82f345c870b148f1165316eb90bccdd6bbb9f7e7215ed881047d801fb98efa0961b0a31db2916f9088611bfc26638866b13964448c069322d8e13740c7e235a
    ac944ab5628448ec3a318ac0ededc9848cb033942edddda5f31e85d358703930a2c940bac68685c28e0fcb12c1173ca089738468cb8579c6ec78881f09d7a188
    0bb8d0724beacf2dee5e2da29dcc888a2db69a5d5ffd657699c1f8b0a2e64ca607f9a49ee77bb576ee5f01a8d8c4f5eabd5aaf96fb5100341ac14a532eba4fbf
    d3ec74fd0cab81d2438bef6ebd5b2d1b78cd7f758373db973f03af40a97f6f03dfef07104503af4029dedfc07b5ebd1278065e81527c6d035f2fb5bb5eddc02b
    5048497cb8812ef9b56ab05c6d0e99307ac30a6ffa5ebf5ec99caf50500d7975c929262c16db6a2d420f59d2078004522448ec88c50c4fd008aa3840941c24c4
    d923d3100a6f8662c661b85429f54b55f82f7f9e3a5211413b1869d6921730e11b43928fc34709998996fb39787535c8e9ebd7274f5f9d3cfdfde4d9b393a7bf
    66732b5786dd0d144f75bbb73f7df3cf8b2f9dbf7ffbf1edf36fd3a9d7f15cc7bff9e5ab377ffcf92ef7b0e255284ebf7bf9e6d5cbd3efbffeebe7e716efed04
    1de8f0218930776ee163e72e8b608116fef820b998c5304444b768c7538e622467b1f8ef89d040df5a208a2cb80e36e3783f01a9b101afcf1f1a8407613217c4
    e2f1661819c07dc6688725d628dc947369611ecee3a97df264aee3ee2274649b3b40b191e5de7c061a4b6c2e83101b34ef50140b34c531168ebcc60e31b6acee
    0121465cf7c928619c4d84f380381d44ac21199203a39a56463748047959d80842be8dd8ecdf773a8cda56ddc5472612ee0d442de487981a61bc8ee602453697
    4314513de07b48843692834532d2713d2e20d3534c99d31b63ce6d36b71358af96f49b2033f6b4efd345642213410e6d3ef710633ab2cb0e831045331b7640e2
    50c77ec60fa144917387091b7c9f9977883c873ca0786bbaef136ca4fb6c35b8070aab535a1588bc324f2cb9bc8e9951bf83059d20aca4061a80a1eb1189cf14
    f93579f7ff3b7907113dfde1856545ef47d2ed8e8d7c5c50ccdb09b1de4d37d6247c1b6e5db803968cc987afdb5d348fef60b855369bd747d9fe28dbeeff5eb6
    b7ddcfef5fac57fa0cd22db7ade9765d6ddea3ad7bf709a174201614ef71b57de7d095c67d189476eab915e7cf72b3100ee59d0c1318b86982948d9330f10511
    e1204433d8e3975de964ca33d753eecc1887adbf1ab6fa96783a8ff6d9387d642d97e5e3692a1e1c89d578c9cfc7e17143a4e85a7df51896bb576ca7ea717949
    40da5e8484369949a26a21515f0eca20a98773089a85845ad97b61d1b4b06848f7cb546db0006a795660dbe4c066abe5fa1e9880113c55218ac7324f69aa97d9
    55c97c9f99de164ca302600fb1ac8055a69b92ebd6e5c9d5a5a5768e4c1b24b4723349a8c8a81ec64334c65975cad1f3d0b868ae9bab941af46428d47c505a2b
    1af5c6bb585c36d760b7ae0d34d69582c6ce71cbad557d2899119ab5dc093cfac3613483dae172bb8be814de9f8d4492def097519659c24517f1100db8129d54
    0d222270e25012b55cb9fc3c0d34561aa2b8952b20081f2cb926c8ca87460e926e26194f267824f4b46b2332d2e929287caa15d6abcafcf26069c9e690ee4138
    3e760ee83cb98ba0c4fc7a5906704c38bc012aa7d11c1378a5990bd9aafed61a5326bbfa3b455543e938a2b310651d4517f314aea43ca7a3cef2186867d99a21
    a05a48b2467830950d560faad14df3ae9172d8da75cf369291d34473d5330d55915dd3ae62c60ccb36b016cbcb35798dd532c4a0697a874fa57b5d729b4bad5b
    db27e45d02029ec7cfd275cfd110346aabc90c6a92f1a60c4bcdce46cddeb15ce019d4ced32434d5af2dddaec52def11d6e960f0529d1fecd6ab168626cb7da5
    8ab4faf6a17f9e60070f413cbaf022784e0557a9848f0f09820dd140ed4952d9805be491c86e0d3872e60969b98f4b7edb0b2a7e502835fc5ec1ab7aa542c36f
    570b6ddfaf967b7eb9d4ed549e4063116154f6d3ef2e7d780d4517d9d71735bef105265abe69bb32625191a92f2c45455c7d812957b67f81710888cee35aa5df
    ac363bb542b3daee17bc6ea7516806b54ea15b0beadd7e37f01bcdfe13d7395260af5d0dbc5aaf51a89583a0e0d54a927ea359a87b954adbabb71b3daffd24db
    c6c0ca53f9c86201e155bc76ff050000ffff0100504b0304140006000800000021000dd1909fb60000001b010000270000007468656d652f7468656d652f5f72
    656c732f7468656d654d616e616765722e786d6c2e72656c73848f4d0ac2301484f78277086f6fd3ba109126dd88d0add40384e4350d363f2451eced0dae2c08
    2e8761be9969bb979dc9136332de3168aa1a083ae995719ac16db8ec8e4052164e89d93b64b060828e6f37ed1567914b284d262452282e3198720e274a939cd0
    8a54f980ae38a38f56e422a3a641c8bbd048f7757da0f19b017cc524bd62107bd5001996509affb3fd381a89672f1f165dfe514173d9850528a2c6cce0239baa
    4c04ca5bbabac4df000000ffff0100504b01022d0014000600080000002100e9de0fbfff0000001c0200001100000000000000000000000000000000005b436f
    6e74656e745f54797065735d2e786d6c504b01022d0014000600080000002100a5d6a7e7c0000000360100000b00000000000000000000000000100100005f72
    656c732f2e72656c73504b01022d00140006000800000021006b799616810000008a0000001c00000000000000000000000000190200007468656d652f746865
    6d652f7468656d654d616e616765722e786d6c504b01022d001400060008000000210007b740aaca0600008f1a00001600000000000000000000000000d60200
    007468656d652f7468656d652f7468656d65312e786d6c504b01022d00140006000800000021000dd1909fb60000001b01000027000000000000000000000000
    00d40900007468656d652f7468656d652f5f72656c732f7468656d654d616e616765722e786d6c2e72656c73504b050600000000050005005d010000cf0a00000000}
    {\\*\\colorschememapping 3c3f786d6c2076657273696f6e3d22312e302220656e636f64696e673d225554462d3822207374616e64616c6f6e653d22796573223f3e0d0a3c613a636c724d
    617020786d6c6e733a613d22687474703a2f2f736368656d61732e6f70656e786d6c666f726d6174732e6f72672f64726177696e676d6c2f323030362f6d6169
    6e22206267313d226c743122207478313d22646b3122206267323d226c743222207478323d22646b322220616363656e74313d22616363656e74312220616363
    656e74323d22616363656e74322220616363656e74333d22616363656e74332220616363656e74343d22616363656e74342220616363656e74353d22616363656e74352220616363656e74363d22616363656e74362220686c696e6b3d22686c696e6b2220666f6c486c696e6b3d22666f6c486c696e6b222f3e}
    {\\*\\latentstyles\\lsdstimax375\\lsdlockeddef0\\lsdsemihiddendef0\\lsdunhideuseddef0\\lsdqformatdef0\\lsdprioritydef99{\\lsdlockedexcept \\lsdqformat1 \\lsdpriority0 \\lsdlocked0 Normal;\\lsdqformat1 \\lsdpriority0 \\lsdlocked0 heading 1;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 4;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 7;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority9 \\lsdlocked0 heading 9;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 1;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 5;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index 9;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 6;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority39 \\lsdlocked0 toc 9;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal Indent;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footnote text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 header;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footer;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 index heading;\\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority35 \\lsdlocked0 caption;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 table of figures;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 envelope address;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 envelope return;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 footnote reference;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation reference;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 line number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 page number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 endnote reference;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 endnote text;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 table of authorities;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 macro;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 toa heading;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Bullet 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Number 5;\\lsdqformat1 \\lsdpriority10 \\lsdlocked0 Title;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Closing;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Signature;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority1 \\lsdlocked0 Default Paragraph Font;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 4;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 List Continue 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Message Header;\\lsdqformat1 \\lsdpriority11 \\lsdlocked0 Subtitle;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Salutation;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Date;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text First Indent;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text First Indent 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Note Heading;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Body Text Indent 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Block Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Hyperlink;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 FollowedHyperlink;\\lsdqformat1 \\lsdpriority22 \\lsdlocked0 Strong;
    \\lsdqformat1 \\lsdpriority20 \\lsdlocked0 Emphasis;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Document Map;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Plain Text;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 E-mail Signature;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Top of Form;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Bottom of Form;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal (Web);\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Acronym;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Address;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Cite;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Code;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Definition;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Keyboard;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Preformatted;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Sample;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Typewriter;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 HTML Variable;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Normal Table;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 annotation subject;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 No List;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Outline List 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 1;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Simple 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Classic 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Colorful 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 3;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Columns 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 6;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Grid 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 4;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 5;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 6;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 7;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table List 8;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table 3D effects 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Contemporary;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Elegant;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Professional;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Subtle 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Subtle 2;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 1;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 2;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Web 3;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Balloon Text;\\lsdpriority39 \\lsdlocked0 Table Grid;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Table Theme;\\lsdsemihidden1 \\lsdlocked0 Placeholder Text;
    \\lsdqformat1 \\lsdpriority1 \\lsdlocked0 No Spacing;\\lsdpriority60 \\lsdlocked0 Light Shading;\\lsdpriority61 \\lsdlocked0 Light List;\\lsdpriority62 \\lsdlocked0 Light Grid;\\lsdpriority63 \\lsdlocked0 Medium Shading 1;\\lsdpriority64 \\lsdlocked0 Medium Shading 2;
    \\lsdpriority65 \\lsdlocked0 Medium List 1;\\lsdpriority66 \\lsdlocked0 Medium List 2;\\lsdpriority67 \\lsdlocked0 Medium Grid 1;\\lsdpriority68 \\lsdlocked0 Medium Grid 2;\\lsdpriority69 \\lsdlocked0 Medium Grid 3;\\lsdpriority70 \\lsdlocked0 Dark List;
    \\lsdpriority71 \\lsdlocked0 Colorful Shading;\\lsdpriority72 \\lsdlocked0 Colorful List;\\lsdpriority73 \\lsdlocked0 Colorful Grid;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 1;\\lsdpriority61 \\lsdlocked0 Light List Accent 1;
    \\lsdpriority62 \\lsdlocked0 Light Grid Accent 1;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 1;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 1;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 1;\\lsdsemihidden1 \\lsdlocked0 Revision;
    \\lsdqformat1 \\lsdpriority34 \\lsdlocked0 List Paragraph;\\lsdqformat1 \\lsdpriority29 \\lsdlocked0 Quote;\\lsdqformat1 \\lsdpriority30 \\lsdlocked0 Intense Quote;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 1;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 1;
    \\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 1;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 1;\\lsdpriority70 \\lsdlocked0 Dark List Accent 1;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 1;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 1;
    \\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 1;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 2;\\lsdpriority61 \\lsdlocked0 Light List Accent 2;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 2;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 2;
    \\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 2;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 2;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 2;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 2;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 2;
    \\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 2;\\lsdpriority70 \\lsdlocked0 Dark List Accent 2;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 2;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 2;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 2;
    \\lsdpriority60 \\lsdlocked0 Light Shading Accent 3;\\lsdpriority61 \\lsdlocked0 Light List Accent 3;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 3;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 3;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 3;
    \\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 3;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 3;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 3;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 3;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 3;
    \\lsdpriority70 \\lsdlocked0 Dark List Accent 3;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 3;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 3;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 3;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 4;
    \\lsdpriority61 \\lsdlocked0 Light List Accent 4;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 4;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 4;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 4;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 4;
    \\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 4;\\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 4;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 4;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 4;\\lsdpriority70 \\lsdlocked0 Dark List Accent 4;
    \\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 4;\\lsdpriority72 \\lsdlocked0 Colorful List Accent 4;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 4;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 5;\\lsdpriority61 \\lsdlocked0 Light List Accent 5;
    \\lsdpriority62 \\lsdlocked0 Light Grid Accent 5;\\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 5;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 5;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 5;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 5;
    \\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 5;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 5;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 5;\\lsdpriority70 \\lsdlocked0 Dark List Accent 5;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 5;
    \\lsdpriority72 \\lsdlocked0 Colorful List Accent 5;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 5;\\lsdpriority60 \\lsdlocked0 Light Shading Accent 6;\\lsdpriority61 \\lsdlocked0 Light List Accent 6;\\lsdpriority62 \\lsdlocked0 Light Grid Accent 6;
    \\lsdpriority63 \\lsdlocked0 Medium Shading 1 Accent 6;\\lsdpriority64 \\lsdlocked0 Medium Shading 2 Accent 6;\\lsdpriority65 \\lsdlocked0 Medium List 1 Accent 6;\\lsdpriority66 \\lsdlocked0 Medium List 2 Accent 6;
    \\lsdpriority67 \\lsdlocked0 Medium Grid 1 Accent 6;\\lsdpriority68 \\lsdlocked0 Medium Grid 2 Accent 6;\\lsdpriority69 \\lsdlocked0 Medium Grid 3 Accent 6;\\lsdpriority70 \\lsdlocked0 Dark List Accent 6;\\lsdpriority71 \\lsdlocked0 Colorful Shading Accent 6;
    \\lsdpriority72 \\lsdlocked0 Colorful List Accent 6;\\lsdpriority73 \\lsdlocked0 Colorful Grid Accent 6;\\lsdqformat1 \\lsdpriority19 \\lsdlocked0 Subtle Emphasis;\\lsdqformat1 \\lsdpriority21 \\lsdlocked0 Intense Emphasis;
    \\lsdqformat1 \\lsdpriority31 \\lsdlocked0 Subtle Reference;\\lsdqformat1 \\lsdpriority32 \\lsdlocked0 Intense Reference;\\lsdqformat1 \\lsdpriority33 \\lsdlocked0 Book Title;\\lsdsemihidden1 \\lsdunhideused1 \\lsdpriority37 \\lsdlocked0 Bibliography;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdqformat1 \\lsdpriority39 \\lsdlocked0 TOC Heading;\\lsdpriority41 \\lsdlocked0 Plain Table 1;\\lsdpriority42 \\lsdlocked0 Plain Table 2;\\lsdpriority43 \\lsdlocked0 Plain Table 3;\\lsdpriority44 \\lsdlocked0 Plain Table 4;
    \\lsdpriority45 \\lsdlocked0 Plain Table 5;\\lsdpriority40 \\lsdlocked0 Grid Table Light;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light;\\lsdpriority47 \\lsdlocked0 Grid Table 2;\\lsdpriority48 \\lsdlocked0 Grid Table 3;\\lsdpriority49 \\lsdlocked0 Grid Table 4;
    \\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 1;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 1;
    \\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 1;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 1;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 1;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 1;
    \\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 1;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 2;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 2;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 2;
    \\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 2;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 2;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 2;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 2;
    \\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 3;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 3;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 3;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 3;
    \\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 3;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 3;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 3;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 4;
    \\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 4;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 4;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 4;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 4;
    \\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 4;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 4;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 5;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 5;
    \\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 5;\\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 5;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 5;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 5;
    \\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 5;\\lsdpriority46 \\lsdlocked0 Grid Table 1 Light Accent 6;\\lsdpriority47 \\lsdlocked0 Grid Table 2 Accent 6;\\lsdpriority48 \\lsdlocked0 Grid Table 3 Accent 6;
    \\lsdpriority49 \\lsdlocked0 Grid Table 4 Accent 6;\\lsdpriority50 \\lsdlocked0 Grid Table 5 Dark Accent 6;\\lsdpriority51 \\lsdlocked0 Grid Table 6 Colorful Accent 6;\\lsdpriority52 \\lsdlocked0 Grid Table 7 Colorful Accent 6;
    \\lsdpriority46 \\lsdlocked0 List Table 1 Light;\\lsdpriority47 \\lsdlocked0 List Table 2;\\lsdpriority48 \\lsdlocked0 List Table 3;\\lsdpriority49 \\lsdlocked0 List Table 4;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark;
    \\lsdpriority51 \\lsdlocked0 List Table 6 Colorful;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 1;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 1;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 1;
    \\lsdpriority49 \\lsdlocked0 List Table 4 Accent 1;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 1;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 1;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 1;
    \\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 2;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 2;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 2;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 2;
    \\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 2;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 2;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 2;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 3;
    \\lsdpriority47 \\lsdlocked0 List Table 2 Accent 3;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 3;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 3;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 3;
    \\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 3;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 3;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 4;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 4;
    \\lsdpriority48 \\lsdlocked0 List Table 3 Accent 4;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 4;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 4;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 4;
    \\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 4;\\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 5;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 5;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 5;
    \\lsdpriority49 \\lsdlocked0 List Table 4 Accent 5;\\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 5;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 5;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 5;
    \\lsdpriority46 \\lsdlocked0 List Table 1 Light Accent 6;\\lsdpriority47 \\lsdlocked0 List Table 2 Accent 6;\\lsdpriority48 \\lsdlocked0 List Table 3 Accent 6;\\lsdpriority49 \\lsdlocked0 List Table 4 Accent 6;
    \\lsdpriority50 \\lsdlocked0 List Table 5 Dark Accent 6;\\lsdpriority51 \\lsdlocked0 List Table 6 Colorful Accent 6;\\lsdpriority52 \\lsdlocked0 List Table 7 Colorful Accent 6;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Mention;
    \\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Smart Hyperlink;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Hashtag;\\lsdsemihidden1 \\lsdunhideused1 \\lsdlocked0 Unresolved Mention;}}{\\*\\datastore 010500000200000018000000
    4d73786d6c322e534158584d4c5265616465722e362e1000000000000000000000060000
    d0cf11e0a1b11ae1000000000000000000000000000000003e000100feff090006000000000000000000000001000000010000000000000000100000feffffff00000000feffffff0000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffdfffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff52006f006f007400200045006e00740072007900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016000500ffffffffffffffffffffffff0c6ad98892f1d411a65f0040963251e50000000000000000000000003019
    e3e360c1d501feffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000
    00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000
    000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffff000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000105000000000000}}`;
   let elem: HTMLElement = createElement('p', {
     id: 'imagePaste', innerHTML: localElem1
   });
   (editorObj.msWordPaste as any).imageConversion(elem, rtfData1);
   expect(elem.querySelectorAll('img')[0].getAttribute('src').indexOf('base64') >= 0);
  });

  it('Sub list conversion from MSWord', (done) => {
    let localElem: string = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <meta http-equiv=Content-Type content="text/html; charset=utf-8">
    <style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:Batang;
      panose-1:2 3 6 0 0 1 1 1 1 1;
      mso-font-alt:바탕;
      mso-font-charset:129;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-1342176593 1775729915 48 0 524447 0;}
    @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-536858881 -1073732485 9 0 511 0;}
    @font-face
      {font-family:AlembaVar;
      mso-font-alt:"Times New Roman";
      mso-font-charset:0;
      mso-generic-font-family:auto;
      mso-font-pitch:variable;
      mso-font-signature:-2147483473 1073750090 0 0 155 0;}
    @font-face
      {font-family:"\@Batang";
      panose-1:2 3 6 0 0 1 1 1 1 1;
      mso-font-charset:129;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-1342176593 1775729915 48 0 524447 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-name:"Normal\,Alemba body text";
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    h1
      {mso-style-name:"Heading 1\,Alemba Heading 1\,Alemba Section Heading";
      mso-style-update:auto;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      mso-style-link:"Heading 1 Char\,Alemba Heading 1 Char\,Alemba Section Heading Char";
      mso-style-next:"Normal\,Alemba body text";
      margin-top:.25in;
      margin-right:0in;
      margin-bottom:6.0pt;
      margin-left:35.7pt;
      text-indent:-17.85pt;
      page-break-before:always;
      mso-pagination:widow-orphan;
      page-break-after:avoid;
      mso-outline-level:1;
      mso-list:l0 level1 lfo1;
      font-size:16.0pt;
      font-family:AlembaVar;
      mso-fareast-font-family:Batang;
      mso-bidi-font-family:Arial;
      color:black;
      mso-font-kerning:14.0pt;
      mso-ansi-language:EN-GB;
      font-weight:normal;
      mso-bidi-font-style:italic;}
    p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-link:"List Paragraph Char";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-link:"List Paragraph Char";
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-link:"List Paragraph Char";
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-link:"List Paragraph Char";
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:12.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:EN-GB;}
    span.Heading1Char
      {mso-style-name:"Heading 1 Char\,Alemba Heading 1 Char\,Alemba Section Heading Char";
      mso-style-unhide:no;
      mso-style-locked:yes;
      mso-style-link:"Heading 1\,Alemba Heading 1\,Alemba Section Heading";
      mso-ansi-font-size:16.0pt;
      mso-bidi-font-size:16.0pt;
      font-family:AlembaVar;
      mso-ascii-font-family:AlembaVar;
      mso-fareast-font-family:Batang;
      mso-hansi-font-family:AlembaVar;
      mso-bidi-font-family:Arial;
      color:black;
      mso-font-kerning:14.0pt;
      mso-ansi-language:EN-GB;
      mso-fareast-language:EN-US;
      mso-bidi-font-style:italic;}
    span.ListParagraphChar
      {mso-style-name:"List Paragraph Char";
      mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-locked:yes;
      mso-style-link:"List Paragraph";
      mso-ansi-font-size:12.0pt;
      font-family:"Batang",serif;
      mso-fareast-font-family:Batang;
      mso-ansi-language:EN-GB;
      mso-fareast-language:EN-US;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:DengXian;
      mso-fareast-theme-font:minor-fareast;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-fareast-language:ZH-CN;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
     /* List Definitions */
     @list l0
      {mso-list-id:1566911212;
      mso-list-template-ids:229287532;}
    @list l0:level1
      {mso-level-style-link:"Heading 1";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level2
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:.75in;
      text-indent:-.5in;
      text-decoration:none;
      text-line-through:none;}
    @list l0:level3
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:.75in;
      text-indent:-.5in;}
    @list l0:level4
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.0in;
      text-indent:-.75in;}
    @list l0:level5
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4\.%5";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.0in;
      text-indent:-.75in;}
    @list l0:level6
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4\.%5\.%6";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.25in;
      text-indent:-1.0in;}
    @list l0:level7
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4\.%5\.%6\.%7";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.25in;
      text-indent:-1.0in;}
    @list l0:level8
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4\.%5\.%6\.%7\.%8";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.5in;
      text-indent:-1.25in;}
    @list l0:level9
      {mso-level-legal-format:yes;
      mso-level-text:"%1\.%2\.%3\.%4\.%5\.%6\.%7\.%8\.%9";
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      margin-left:1.5in;
      text-indent:-1.25in;}
    ol
      {margin-bottom:0in;}
    ul
      {margin-bottom:0in;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:"Table Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-fareast-language:ZH-CN;}
    </style>
    <![endif]-->
    </head>
    <body lang=EN-US style='tab-interval:.5in'>
    <!--StartFragment-->
    <h1 style='mso-list:l0 level1 lfo1'><a name="_Toc513533907"><![if !supportLists]><span
    lang=EN-GB style='mso-fareast-font-family:AlembaVar;mso-bidi-font-family:AlembaVar'><span
    style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
    </span></span></span><![endif]><span lang=EN-GB>Explorer</span></a><span
    lang=EN-GB><o:p></o:p></span></h1>
    <p class=MsoNormal><span lang=EN-GB>The following controls – Explorer, Tree,
    Federated CMDB Tree and List – are closely related, and their design should be
    planned jointly.<o:p></o:p></span></p>
    <p class=MsoListParagraph style='margin-top:12.0pt;margin-right:0in;margin-bottom:
    6.0pt;margin-left:.75in;text-indent:-.5in;mso-list:l0 level2 lfo1'><![if !supportLists]><span
    lang=EN-GB style='mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
    mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin'><span
    style='mso-list:Ignore'>1.1<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><![endif]><span lang=EN-GB>Overview<o:p></o:p></span></p>
    <span lang=EN-GB style='font-size:12.0pt;mso-bidi-font-size:11.0pt;line-height:
    107%;font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;
    mso-fareast-font-family:Batang;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
    "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-GB;
    mso-fareast-language:EN-US;mso-bidi-language:AR-SA'>The purpose of the explorer</span><!--EndFragment--></body></html>`;
    rteObj.value = '<p>22</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<h1><a name="_Toc513533907"><span lang="EN-GB"><span>1.<span style="font:7.0pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;
    </span></span></span><span lang="EN-GB">Explorer</span></a></h1><p><span lang="EN-GB">The following controls – Explorer, Tree,
    Federated CMDB Tree and List – are closely related, and their design should be
    planned jointly.</span></p><ol level="2"><li><p><span lang="EN-GB">Overview</span></p></li></ol><p><span lang="EN-GB" style="font-size:12.0pt;line-height:
    107%;font-family:&quot;Calibri&quot;,sans-serif;">The purpose of the explorer</span></p><p>22</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('EJ2-41730 - Rare type of list content', (done) => {
    let localElem: string = `<html><head><style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-469750017 -1073732485 9 0 511 0;}
    @font-face
      {font-family:Cambria;
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:10.0pt;
      margin-left:0in;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoHeader, li.MsoHeader, div.MsoHeader
      {mso-style-priority:99;
      mso-style-link:"Header Char";
      margin:0in;
      margin-bottom:.0001pt;
      mso-pagination:widow-orphan;
      tab-stops:center 212.6pt right 425.2pt;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoFooter, li.MsoFooter, div.MsoFooter
      {mso-style-priority:99;
      mso-style-link:"Footer Char";
      margin:0in;
      margin-bottom:.0001pt;
      mso-pagination:widow-orphan;
      tab-stops:center 212.6pt right 425.2pt;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:10.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:10.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    span.HeaderChar
      {mso-style-name:"Header Char";
      mso-style-priority:99;
      mso-style-unhide:no;
      mso-style-locked:yes;
      mso-style-link:Header;}
    span.FooterChar
      {mso-style-name:"Footer Char";
      mso-style-priority:99;
      mso-style-unhide:no;
      mso-style-locked:yes;
      mso-style-link:Footer;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:10.0pt;
      line-height:115%;}
    @page WordSection1
      {size:595.3pt 841.9pt;
      margin:70.85pt 85.05pt 70.85pt 85.05pt;
      mso-header-margin:35.4pt;
      mso-footer-margin:35.4pt;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
     /* List Definitions */
     @list l0
      {mso-list-id:415592100;
      mso-list-type:hybrid;
      mso-list-template-ids:-368527292 -1571935822 68550681 68550683 68550671 68550681 68550683 68550671 68550681 68550683;}
    @list l0:level1
      {mso-level-text:%1-;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level2
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level3
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    @list l0:level4
      {mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level5
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level6
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    @list l0:level7
      {mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level8
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level9
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    ol
      {margin-bottom:0in;}
    ul
      {margin-bottom:0in;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:"Table Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:10.0pt;
      mso-para-margin-left:0in;
      line-height:115%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-ansi-language:PT-BR;}
    </style><![endif]--></head><body lang=EN-US style='tab-interval:.5in'><!--StartFragment--><p class=MsoNormal><span lang=PT-BR style='font-size:12.0pt;line-height:115%;
    font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;mso-hansi-theme-font:
    major-latin'><o:p>&nbsp;</o:p></span></p><p class=MsoListParagraphCxSpFirst style='margin-bottom:7.5pt;mso-add-space:
    auto;text-indent:-.25in;line-height:normal;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    lang=PT-BR style='font-size:12.0pt;font-family:"Cambria",serif;mso-ascii-theme-font:
    major-latin;mso-fareast-font-family:Cambria;mso-fareast-theme-font:major-latin;
    mso-hansi-theme-font:major-latin;mso-bidi-font-family:Cambria;mso-bidi-theme-font:
    major-latin;color:black;mso-fareast-language:PT-BR'><span style='mso-list:Ignore'>1-<span
    style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]><span
    lang=PT-BR style='font-size:12.0pt;font-family:"Cambria",serif;mso-ascii-theme-font:
    major-latin;mso-fareast-font-family:"Times New Roman";mso-hansi-theme-font:
    major-latin;mso-bidi-font-family:"Times New Roman";color:black;mso-fareast-language:
    PT-BR'>RELORA ------------ 100MG<o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle style='margin-bottom:7.5pt;mso-add-space:
    auto;line-height:normal'><span lang=PT-BR style='font-size:12.0pt;font-family:
    "Cambria",serif;mso-ascii-theme-font:major-latin;mso-fareast-font-family:"Times New Roman";
    mso-hansi-theme-font:major-latin;mso-bidi-font-family:"Times New Roman";
    color:black;mso-fareast-language:PT-BR'>5HTP ----------------- 100MG<o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle style='margin-bottom:7.5pt;mso-add-space:
    auto;line-height:normal'><span lang=PT-BR style='font-size:12.0pt;font-family:
    "Cambria",serif;mso-ascii-theme-font:major-latin;mso-fareast-font-family:"Times New Roman";
    mso-hansi-theme-font:major-latin;mso-bidi-font-family:"Times New Roman";
    color:black;mso-fareast-language:PT-BR'>METILFOLATO ----- 500MCG<o:p></o:p></span></p><p class=MsoListParagraphCxSpLast style='margin-bottom:7.5pt;mso-add-space:
    auto;line-height:normal'><span lang=PT-BR style='font-size:12.0pt;font-family:
    "Cambria",serif;mso-ascii-theme-font:major-latin;mso-fareast-font-family:"Times New Roman";
    mso-hansi-theme-font:major-latin;mso-bidi-font-family:"Times New Roman";
    color:black;mso-fareast-language:PT-BR'>. 2 DOSES AO DIA. <o:p></o:p></span></p><p class=MsoNormal><span lang=PT-BR style='font-size:12.0pt;line-height:115%;
    font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;mso-hansi-theme-font:
    major-latin'><o:p>&nbsp;</o:p></span></p><p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span
    lang=PT-BR style='font-size:12.0pt;line-height:115%;font-family:"Cambria",serif;
    mso-ascii-theme-font:major-latin;mso-fareast-font-family:Cambria;mso-fareast-theme-font:
    major-latin;mso-hansi-theme-font:major-latin;mso-bidi-font-family:Cambria;
    mso-bidi-theme-font:major-latin'><span style='mso-list:Ignore'>2-<span
    style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]><span
    lang=PT-BR style='font-size:12.0pt;line-height:115%;font-family:"Cambria",serif;
    mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'>Melissa (2%
    ácidos romarínicos) ------------<span style='mso-spacerun:yes'></span>100mg <o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle><span lang=PT-BR style='font-size:12.0pt;
    line-height:115%;font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;
    mso-hansi-theme-font:major-latin'>Passiflora (0,5% vitexina)
    ------------------------ 200mg <o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle><span lang=PT-BR style='font-size:12.0pt;
    line-height:115%;font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;
    mso-hansi-theme-font:major-latin'>Valeriana (0,5% Ácido valerênico)
    ----------------- 100mg <o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle><span lang=PT-BR style='font-size:12.0pt;
    line-height:115%;font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;
    mso-hansi-theme-font:major-latin'>Mulungu (0,07% flavonoides)
    -------------------- 200mg <o:p></o:p></span></p><p class=MsoListParagraphCxSpMiddle><span lang=PT-BR style='font-size:12.0pt;
    line-height:115%;font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;
    mso-hansi-theme-font:major-latin'>Melatonina --------------------------------------------
    1mg<o:p></o:p></span></p><p class=MsoListParagraphCxSpLast><span lang=PT-BR style='font-size:12.0pt;
    line-height:115%;font-family:"Cambria",serif;mso-ascii-theme-font:major-latin;
    mso-hansi-theme-font:major-latin'>Tomar 1 dose 1<span
    style='mso-spacerun:yes'>  </span>hora antes de deitar.<o:p></o:p></span></p><!--EndFragment--></body></html>`;
    rteObj.value = '<p>23</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<p><br></p><ol level="1"><li><p><span lang="PT-BR" style="font-size:12.0pt;font-family:&quot;Cambria&quot;,serif;color:black;">RELORA ------------ 100MG</span></p></li></ol><p style="margin-bottom:7.5pt;line-height:normal;"><span lang="PT-BR" style="font-size:12.0pt;font-family:
    &quot;Cambria&quot;,serif;
    color:black;">5HTP ----------------- 100MG</span></p><p style="margin-bottom:7.5pt;line-height:normal;"><span lang="PT-BR" style="font-size:12.0pt;font-family:
    &quot;Cambria&quot;,serif;
    color:black;">METILFOLATO ----- 500MCG</span></p><p style="margin-bottom:7.5pt;line-height:normal;"><span lang="PT-BR" style="font-size:12.0pt;font-family:
    &quot;Cambria&quot;,serif;
    color:black;">. 2 DOSES AO DIA. </span></p><p><br></p><ol level="1"><li><p><span lang="PT-BR" style="font-size:12.0pt;line-height:115%;font-family:&quot;Cambria&quot;,serif;">Melissa (2%
    ácidos romarínicos) ------------100mg </span></p></li></ol><p><span lang="PT-BR" style="font-size:12.0pt;
    line-height:115%;font-family:&quot;Cambria&quot;,serif;">Passiflora (0,5% vitexina)
    ------------------------ 200mg </span></p><p><span lang="PT-BR" style="font-size:12.0pt;
    line-height:115%;font-family:&quot;Cambria&quot;,serif;">Valeriana (0,5% Ácido valerênico)
    ----------------- 100mg </span></p><p><span lang="PT-BR" style="font-size:12.0pt;
    line-height:115%;font-family:&quot;Cambria&quot;,serif;">Mulungu (0,07% flavonoides)
    -------------------- 200mg </span></p><p><span lang="PT-BR" style="font-size:12.0pt;
    line-height:115%;font-family:&quot;Cambria&quot;,serif;">Melatonina --------------------------------------------
    1mg</span></p><p><span lang="PT-BR" style="font-size:12.0pt;
    line-height:115%;font-family:&quot;Cambria&quot;,serif;">Tomar 1 dose 1<span>&nbsp; </span>hora antes de deitar.</span></p><p>23</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('EJ2-37593 - Paste from Excel support', (done) => {
    let localElem: string = `<html><head>
    <style>
    <!--table
      {mso-displayed-decimal-separator:"\.";
      mso-displayed-thousand-separator:"\,";}
    @page
      {margin:.79in .51in .79in .51in;
      mso-header-margin:.31in;
      mso-footer-margin:.31in;}
    .font0
      {color:black;
      font-size:11.0pt;
      font-weight:400;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    .font5
      {color:black;
      font-size:11.0pt;
      font-weight:700;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    .font6
      {color:red;
      font-size:11.0pt;
      font-weight:400;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    .font7
      {color:black;
      font-size:11.0pt;
      font-weight:700;
      font-style:italic;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    .font8
      {color:black;
      font-size:11.0pt;
      font-weight:700;
      font-style:italic;
      text-decoration:underline;
      text-underline-style:single;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    .font9
      {color:red;
      font-size:11.0pt;
      font-weight:700;
      font-style:italic;
      text-decoration:underline;
      text-underline-style:single;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;}
    tr
      {mso-height-source:auto;}
    col
      {mso-width-source:auto;}
    br
      {mso-data-placement:same-cell;}
    td
      {padding-top:1px;
      padding-right:1px;
      padding-left:1px;
      mso-ignore:padding;
      color:black;
      font-size:11.0pt;
      font-weight:400;
      font-style:normal;
      text-decoration:none;
      font-family:Calibri, sans-serif;
      mso-font-charset:0;
      mso-number-format:General;
      text-align:general;
      vertical-align:bottom;
      border:none;
      mso-background-source:auto;
      mso-pattern:auto;
      mso-protection:locked visible;
      white-space:nowrap;
      mso-rotate:0;}
    .xl65
      {text-align:center;
      border:.5pt solid windowtext;}
    .xl66
      {text-align:center;
      border-top:none;
      border-right:.5pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:.5pt solid windowtext;}
    .xl67
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;
      background:#8EA9DB;
      mso-pattern:black none;}
    .xl68
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:.5pt solid windowtext;
      background:#F4B084;
      mso-pattern:black none;}
    .xl69
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:.5pt solid windowtext;
      background:#9900CC;
      mso-pattern:black none;}
    .xl70
      {text-align:center;
      border-top:none;
      border-right:.5pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl71
      {text-align:center;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:.5pt solid windowtext;}
    .xl72
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl73
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:.5pt solid windowtext;}
    .xl74
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl75
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:.5pt solid windowtext;}
    .xl76
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:.5pt solid windowtext;}
    .xl77
      {border-top:1.0pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl78
      {border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl79
      {border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl80
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:none;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl81
      {text-align:center;
      border-top:none;
      border-right:none;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl82
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:none;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl83
      {text-align:center;
      border-top:.5pt solid windowtext;
      border-right:none;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl84
      {border-top:.5pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl85
      {border-top:.5pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:1.0pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl86
      {border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl87
      {border:1.0pt solid windowtext;
      background:yellow;
      mso-pattern:black none;}
    .xl88
      {font-weight:700;
      text-align:center;
      border:1.0pt solid windowtext;}
    .xl89
      {font-weight:700;
      border-top:1.0pt solid windowtext;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl90
      {font-style:italic;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl91
      {text-decoration:underline;
      text-underline-style:single;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl92
      {font-size:16.0pt;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl93
      {font-family:Algerian, fantasy;
      mso-font-charset:0;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl94
      {font-weight:700;
      border-top:none;
      border-right:1.0pt solid windowtext;
      border-bottom:none;
      border-left:1.0pt solid windowtext;
      background:yellow;
      mso-pattern:black none;}
    .xl95
      {text-align:right;
      border-top:.5pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl96
      {text-align:left;
      border-top:.5pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:.5pt solid windowtext;
      border-left:1.0pt solid windowtext;}
    .xl97
      {border-top:.5pt solid red;
      border-right:.5pt solid red;
      border-bottom:.5pt solid red;
      border-left:none;}
    .xl98
      {border-top:none;
      border-right:.5pt solid red;
      border-bottom:none;
      border-left:1.0pt solid windowtext;}
    .xl99
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:.5pt solid windowtext;
      border-bottom:none;
      border-left:.5pt solid windowtext;}
    .xl100
      {text-align:center;
      border-top:1.0pt solid windowtext;
      border-right:none;
      border-bottom:1.0pt solid windowtext;
      border-left:.5pt solid windowtext;
      background:#9900CC;
      mso-pattern:black none;}
    .xl101
      {border-top:1.0pt solid windowtext;
      border-right:none;
      border-bottom:none;
      border-left:none;}
    .xl102
      {border-top:none;
      border-right:none;
      border-bottom:.5pt solid red;
      border-left:none;}
    .xl103
      {border:.5pt solid red;}
    -->
    </style>
    </head>
    <body link="#0563C1" vlink="#954F72">
    <table border=0 cellpadding=0 cellspacing=0 width=830 style='border-collapse:
     collapse;width:623pt'>
    <!--StartFragment-->
     <col width=192 style='mso-width-source:userset;mso-width-alt:6702;width:144pt'>
     <col width=283 style='mso-width-source:userset;mso-width-alt:9867;width:212pt'>
     <col width=64 span=3 style='width:48pt'>
     <col width=99 style='mso-width-source:userset;mso-width-alt:3467;width:75pt'>
     <col width=64 style='width:48pt'>
     <tr height=20 style='height:15.0pt'>
      <td height=20 width=192 style='height:15.0pt;width:144pt'>LUCAS SANTOS
      GUIMARAES<span style='mso-spacerun:yes'> </span></td>
      <td width=283 style='width:212pt'></td>
      <td width=64 style='width:48pt'></td>
      <td width=64 style='width:48pt'></td>
      <td width=64 style='width:48pt'></td>
      <td width=99 style='width:75pt'></td>
      <td width=64 style='width:48pt'></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 style='height:15.0pt'></td>
      <td class=xl67>PTN</td>
      <td class=xl68 style='border-left:none'>CHO</td>
      <td class=xl69 style='border-left:none'>LIP</td>
      <td class=xl80 style='border-left:none'>KCAL</td>
      <td class=xl87>Está Corretor?</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl89 style='height:14.5pt'>FRUTAS ASSOCIADAS</td>
      <td class=xl70 style='border-left:none'>1,107g</td>
      <td class=xl66 style='border-left:none'>22,96g</td>
      <td class=xl71 style='border-left:none'>0,32g</td>
      <td class=xl81 style='border-left:none'>90</td>
      <td class=xl86>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl90 style='height:14.5pt'>Pão</td>
      <td class=xl72 style='border-top:none;border-left:none'>2,8g</td>
      <td class=xl65 style='border-top:none;border-left:none'>11,2g</td>
      <td class=xl73 style='border-top:none;border-left:none'>1,6g</td>
      <td class=xl82 style='border-top:none;border-left:none'>70</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl91 style='height:14.5pt'>Carboidrato IGB</td>
      <td class=xl95 style='border-top:none;border-left:none'>0,58g</td>
      <td class=xl65 style='border-top:none;border-left:none'>11,91g</td>
      <td class=xl73 style='border-top:none;border-left:none'>0,09g</td>
      <td class=xl82 style='border-top:none;border-left:none'>50.4</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>LE<font class="font6">GUMINO</font><font
      class="font0">SAS</font></td>
      <td class=xl72 style='border-top:none;border-left:none'>4,11g</td>
      <td class=xl65 style='border-top:none;border-left:none'>9,17g</td>
      <td class=xl73 style='border-top:none;border-left:none'>3,31g</td>
      <td class=xl82 style='border-top:none;border-left:none'>80.75</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=28 style='height:21.0pt'>
      <td height=28 class=xl92 style='height:21.0pt'>Proteina Refeição Padrão</td>
      <td class=xl96 style='border-top:none;border-left:none'>24,71g</td>
      <td class=xl65 style='border-top:none;border-left:none'>0g</td>
      <td class=xl73 style='border-top:none;border-left:none'>6,16g</td>
      <td class=xl82 style='border-top:none;border-left:none'>160.74</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=21 style='height:16.0pt'>
      <td height=21 class=xl93 style='height:16.0pt'>FRUTAS GERIAS</td>
      <td class=xl72 style='border-top:none;border-left:none'>0,97g</td>
      <td class=xl65 style='border-top:none;border-left:none'>31,23g</td>
      <td class=xl73 style='border-top:none;border-left:none'>0,32g</td>
      <td class=xl82 style='border-top:none;border-left:none'>118</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Semente</td>
      <td class=xl72 style='border-top:none;border-left:none'>1g</td>
      <td class=xl65 style='border-top:none;border-left:none'>1g</td>
      <td class=xl73 style='border-top:none;border-left:none'>3g</td>
      <td class=xl82 style='border-top:none;border-left:none'>39.5</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl94 style='height:14.5pt'><font class="font5">Veg</font><font
      class="font7">etai</font><font class="font8">s Cru</font><font class="font9">s
      ou Cuzidos</font></td>
      <td class=xl72 style='border-top:none;border-left:none'>1,75g</td>
      <td class=xl65 style='border-top:none;border-left:none'>3,5g</td>
      <td class=xl73 style='border-top:none;border-left:none'>1,37g</td>
      <td class=xl82 style='border-top:none;border-left:none'>33.5</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Vegetal Refogado</td>
      <td class=xl72 style='border-top:none;border-left:none'>0,87g</td>
      <td class=xl65 style='border-top:none;border-left:none'>3,41g</td>
      <td class=xl73 style='border-top:none;border-left:none'>4,06g</td>
      <td class=xl82 style='border-top:none;border-left:none'>50.4</td>
      <td class=xl84 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 class=xl79 style='height:15.0pt'>QUEIJO</td>
      <td class=xl74 style='border-top:none;border-left:none'>4,37g</td>
      <td class=xl75 style='border-top:none;border-left:none'>1,27g</td>
      <td class=xl76 style='border-top:none;border-left:none'>5,18g</td>
      <td class=xl83 style='border-top:none;border-left:none'>69</td>
      <td class=xl85 style='border-top:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 style='height:15.0pt'></td>
      <td></td><td></td><td></td><td></td>
      <td class=xl101 style='border-top:none'>&nbsp;</td>
      <td class=xl102>&nbsp;</td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 style='height:15.0pt'></td>
      <td class=xl67>PTN</td>
      <td class=xl68 style='border-left:none'>CHO</td>
      <td class=xl100 style='border-left:none'>LIP</td>
      <td>hello</td>
      <td></td>
      <td class=xl97 style='border-top:none'>wqdq</td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl77 style='height:14.5pt'>FRUTAS ASSOCIADAS</td>
      <td class=xl70 style='border-left:none'>&nbsp;</td>
      <td class=xl99 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl71 style='border-left:none'>&nbsp;</td>
      <td></td>
      <td class=xl102>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Pão</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl66 style='border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl98 style='border-left:none'>&nbsp;</td>
      <td class=xl103 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Carboidrato IGB</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>LEGUMINOSAS</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Proteina Refeição Padrão</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>FRUTAS GERIAS</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Semente</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Vegetais Crus ou Cuzidos</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl78 style='height:14.5pt'>Vegetal Refogado</td>
      <td class=xl72 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl65 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl73 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 class=xl79 style='height:15.0pt'>QUEIJO</td>
      <td class=xl74 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl75 style='border-top:none;border-left:none'>&nbsp;</td>
      <td class=xl76 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 style='height:14.5pt'></td>
      <td></td><td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 style='height:15.0pt'></td>
      <td></td><td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 class=xl88 style='height:15.0pt'>PERGUNTAS</td>
      <td class=xl88 style='border-left:none'>RESPOSTAS</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl86 style='height:14.5pt'>Quantidade de água</td>
      <td class=xl86 style='border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl84 style='height:14.5pt;border-top:none'>sdsd</td>
      <td class=xl84 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl84 style='height:14.5pt;border-top:none'>vsdvdvsdvsdvsdvsdvds
      vsd vsfgbd vdsvsdvd svsdvsdvsdvs dvsdvsdvsd</td>
      <td class=xl84 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl84 style='height:14.5pt;border-top:none'>Cirurgias</td>
      <td class=xl84 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=19 style='height:14.5pt'>
      <td height=19 class=xl84 style='height:14.5pt;border-top:none'>Fezes</td>
      <td class=xl84 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
     <tr height=20 style='height:15.0pt'>
      <td height=20 class=xl85 style='height:15.0pt;border-top:none'>Profissão</td>
      <td class=xl85 style='border-top:none;border-left:none'>&nbsp;</td>
      <td></td><td></td><td></td><td></td><td></td>
     </tr>
    <!--EndFragment--></table></body></html>`;
    rteObj.value = '<p>24</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<table cellpadding="0" cellspacing="0" width="830" class="e-rte-table-border e-rte-table" style="width:623pt;"><tbody><tr height="20" style="height:15.0pt;"><td height="20" width="192" style="height:15.0pt;width:144pt;">LUCAS SANTOS
      GUIMARAES<span>&nbsp;</span></td><td width="283" style="width:212pt;"></td><td width="64" style="width:48pt;"></td><td width="64" style="width:48pt;"></td><td width="64" style="width:48pt;"></td><td width="99" style="width:75pt;"></td><td width="64" style="width:48pt;"></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height:15.0pt;"></td><td style="text-align:center;">PTN</td><td style="text-align: center;">CHO</td><td style="text-align: center;">LIP</td><td style="text-align: center;">KCAL</td><td style="border:1.0pt solid windowtext;">Está Corretor?</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;font-weight:700;">FRUTAS ASSOCIADAS</td><td style="text-align: center;">1,107g</td><td style="text-align: center;">22,96g</td><td style="text-align: center;">0,32g</td><td style="text-align: center;">90</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;font-style:italic;">Pão</td><td style="text-align: center;">2,8g</td><td style="text-align: center;">11,2g</td><td style="text-align: center;">1,6g</td><td style="text-align: center;">70</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;text-decoration:underline;">Carboidrato IGB</td><td style="text-align: right;">0,58g</td><td style="text-align: center;">11,91g</td><td style="text-align: center;">0,09g</td><td style="text-align: center;">50.4</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">LE<font style="color:red;">GUMINO</font><font style="color:black;">SAS</font></td><td style="text-align: center;">4,11g</td><td style="text-align: center;">9,17g</td><td style="text-align: center;">3,31g</td><td style="text-align: center;">80.75</td><td style="">&nbsp;</td><td></td></tr><tr height="28" style="height:21.0pt;"><td height="28" style="height:21.0pt;font-size:16.0pt;">Proteina Refeição Padrão</td><td style="text-align: left;">24,71g</td><td style="text-align: center;">0g</td><td style="text-align: center;">6,16g</td><td style="text-align: center;">160.74</td><td style="">&nbsp;</td><td></td></tr><tr height="21" style="height:16.0pt;"><td height="21" style="height:16.0pt;font-family:Algerian, fantasy;">FRUTAS GERIAS</td><td style="text-align: center;">0,97g</td><td style="text-align: center;">31,23g</td><td style="text-align: center;">0,32g</td><td style="text-align: center;">118</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Semente</td><td style="text-align: center;">1g</td><td style="text-align: center;">1g</td><td style="text-align: center;">3g</td><td style="text-align: center;">39.5</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;font-weight:700;"><font style="color:black;">Veg</font><font style="color:black;">etai</font><font style="color:black;">s Cru</font><font style="color:red;">s
      ou Cuzidos</font></td><td style="text-align: center;">1,75g</td><td style="text-align: center;">3,5g</td><td style="text-align: center;">1,37g</td><td style="text-align: center;">33.5</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Vegetal Refogado</td><td style="text-align: center;">0,87g</td><td style="text-align: center;">3,41g</td><td style="text-align: center;">4,06g</td><td style="text-align: center;">50.4</td><td style="">&nbsp;</td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height: 15pt;">QUEIJO</td><td style="text-align: center;">4,37g</td><td style="text-align: center;">1,27g</td><td style="text-align: center;">5,18g</td><td style="text-align: center;">69</td><td style="">&nbsp;</td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height:15.0pt;"></td><td></td><td></td><td></td><td></td><td style="">&nbsp;</td><td style="">&nbsp;</td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height:15.0pt;"></td><td style="text-align:center;">PTN</td><td style="text-align: center;">CHO</td><td style="text-align: center;">LIP</td><td>hello</td><td></td><td style="">wqdq</td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;border-top:1.0pt solid windowtext;">FRUTAS ASSOCIADAS</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Pão</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="">&nbsp;</td><td style="">&nbsp;</td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Carboidrato IGB</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">LEGUMINOSAS</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Proteina Refeição Padrão</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">FRUTAS GERIAS</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Semente</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Vegetais Crus ou Cuzidos</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Vegetal Refogado</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height: 15pt;">QUEIJO</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">&nbsp;</td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height:14.5pt;"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height:15.0pt;"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height:15.0pt;font-weight:700;">PERGUNTAS</td><td style="font-weight: 700;">RESPOSTAS</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Quantidade de água</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">sdsd</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">vsdvdvsdvsdvsdvsdvds
      vsd vsfgbd vdsvsdvd svsdvsdvsdvs dvsdvsdvsd</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Cirurgias</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="19" style="height:14.5pt;"><td height="19" style="height: 14.5pt;">Fezes</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr><tr height="20" style="height:15.0pt;"><td height="20" style="height: 15pt;">Profissão</td><td style="">&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><p>24</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it('EJ2-44443 - Image getting removed', (done) => {
    let localElem: string = `<p id="MSWord-Content">
<ol level="1" style="margin-bottom:0in;"><li><p><span lang="ES-CO">especificaciones.</span><span lang="ES-CO" style=""> </span></p></li></ol>
<p class="MsoNormal" style="text-align:justify;margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><span lang="ES-CO"><img width="500" height="500" src="" /><span style="">&nbsp;</span></span></p>
<p class="MsoNormal" style="text-align:justify;margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><span lang="ES-CO">&nbsp;</span></p>
<span lang="ES-CO" style="font-size:11.0pt;line-height:107%;font-family:&quot;Calibri&quot;,sans-serif;">En el Edi</span>
</p>`;
    rteObj.value = '<p>25</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<p id="MSWord-Content"></p><ol level="1" style="margin-bottom:0in;"><li><p><span lang="ES-CO">especificaciones.</span><span lang="ES-CO"></span></p></li></ol><p style="text-align:justify;margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;"><span lang="ES-CO"><img width="500" height="500" src="undefined" id="msWordImg-" class="e-rte-image e-imginline"><br></span></p><p><br><span lang="ES-CO" style="font-size:11.0pt;line-height:107%;font-family:&quot;Calibri&quot;,sans-serif;">En el Edi</span></p><p>25</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  it(' EJ2-44442 - Bullet list styles not applied issue ', (done) => {
    let localElem: string = `<p id="MSWord-Content">
    <style>
    <!--
     /* Font Definitions */
     @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
    @font-face
      {font-family:Calibri;
      panose-1:2 15 5 2 2 2 4 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-469750017 -1073732485 9 0 511 0;}
    @font-face
      {font-family:"Arial Black";
      panose-1:2 11 10 4 2 1 2 2 2 4;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:-1610612049 1073772795 0 0 159 0;}
    @font-face
      {font-family:Algerian;
      panose-1:4 2 7 5 4 10 2 6 7 2;
      mso-font-charset:0;
      mso-generic-font-family:decorative;
      mso-font-pitch:variable;
      mso-font-signature:3 0 0 0 1 0;}
     /* Style Definitions */
     p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:0in;
      margin-left:.5in;
      margin-bottom:.0001pt;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
      {mso-style-priority:34;
      mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-type:export-only;
      margin-top:0in;
      margin-right:0in;
      margin-bottom:8.0pt;
      margin-left:.5in;
      mso-add-space:auto;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Calibri;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    .MsoPapDefault
      {mso-style-type:export-only;
      margin-bottom:8.0pt;
      line-height:107%;}
    @page WordSection1
      {size:8.5in 11.0in;
      margin:1.0in 1.0in 1.0in 1.0in;
      mso-header-margin:.5in;
      mso-footer-margin:.5in;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
     /* List Definitions */
     @list l0
      {mso-list-id:872838580;
      mso-list-type:hybrid;
      mso-list-template-ids:-2046663708 67698703 67698713 67698715 67698703 67698713 67698715 67698703 67698713 67698715;}
    @list l0:level1
      {mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level2
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level3
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    @list l0:level4
      {mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level5
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level6
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    @list l0:level7
      {mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level8
      {mso-level-number-format:alpha-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:left;
      text-indent:-.25in;}
    @list l0:level9
      {mso-level-number-format:roman-lower;
      mso-level-tab-stop:none;
      mso-level-number-position:right;
      text-indent:-9.0pt;}
    ol
      {margin-bottom:0in;}
    ul
      {margin-bottom:0in;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
     /* Style Definitions */
     table.MsoNormalTable
      {mso-style-name:"Table Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0in 5.4pt 0in 5.4pt;
      mso-para-margin-top:0in;
      mso-para-margin-right:0in;
      mso-para-margin-bottom:8.0pt;
      mso-para-margin-left:0in;
      line-height:107%;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Calibri",sans-serif;
      mso-ascii-font-family:Calibri;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Calibri;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;}
    </style>
    <![endif]--><!--StartFragment--><p class="MsoListParagraphCxSpFirst" style="text-indent:-.25in;mso-list:l0 level1 lfo1"><!--[if !supportLists]--><span style="font-family:&quot;Arial Black&quot;,sans-serif;mso-fareast-font-family:&quot;Arial Black&quot;;
    mso-bidi-font-family:&quot;Arial Black&quot;"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp; </span></span></span><!--[endif]--><span style="font-family:&quot;Arial Black&quot;,sans-serif">Sdvsdvsvsdvsvs sdvsdvss sdvdsv<o:p></o:p></span></p><p class="MsoListParagraphCxSpMiddle" style="margin-left:1.0in;mso-add-space:
    auto;text-indent:-.25in;mso-list:l0 level2 lfo1"><!--[if !supportLists]--><span style="font-family:Algerian;mso-fareast-font-family:Algerian;mso-bidi-font-family:
    Algerian"><span style="mso-list:Ignore">a.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]--><span style="font-family:Algerian">Sdvsdvdsvsdvs<o:p></o:p></span></p><p class="MsoListParagraphCxSpMiddle" style="margin-left:1.5in;mso-add-space:
    auto;text-indent:-1.5in;mso-text-indent-alt:-9.0pt;mso-list:l0 level3 lfo1"><!--[if !supportLists]--><span style="mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin"><span style="mso-list:Ignore"><span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>i.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->sdvsdvsdvds<o:p></o:p></p><p class="MsoListParagraphCxSpLast" style="text-indent:-.25in;mso-list:l0 level1 lfo1"><!--[if !supportLists]--><span style="mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span></span></span><!--[endif]-->Sdvsdvsd vsvsd sdvsv <o:p></o:p></p><!--EndFragment--></p>`;
    rteObj.value = '<p>30</p>';
    rteObj.dataBind();
    keyBoardEvent.clipboardData = {
      getData: () => {
        return localElem;
      },
      items: []
    };
    setCursorPoint((rteObj as any).inputElement.firstElementChild, 0);
    rteObj.onPaste(keyBoardEvent);
    setTimeout(() => {
      if (rteObj.pasteCleanupSettings.prompt) {
        let keepFormat: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_KEEP_FORMAT);
        keepFormat[0].click();
        let pasteOK: any = document.getElementById(rteObj.getID() + '_pasteCleanupDialog').getElementsByClassName(CLS_RTE_PASTE_OK);
        pasteOK[0].click();
      }
      let pastedElem: any = (rteObj as any).inputElement.innerHTML;
      let expected: boolean = true;
      let expectedElem: string = `<p id="MSWord-Content"></p><ol level="1"><li><p><span style="font-family:&quot;Arial Black&quot;,sans-serif;">Sdvsdvsvsdvsvs sdvsdvss sdvdsv</span></p><ol level="2"><li><p><span style="font-family:Algerian;">Sdvsdvdsvsdvs</span></p><ol level="3"><li><p>sdvsdvsdvds</p></li></ol></li></ol></li><li><p>Sdvsdvsd vsvsd sdvsv </p></li></ol><p>30</p>`;
      if (pastedElem.trim().replace(/>\s+</g, '><') !== expectedElem) {
        expected = false;
      }
      expect(expected).toBe(true);
      done();
    }, 100);
  });

  afterAll(() => {
    destroy(rteObj);
  });
});