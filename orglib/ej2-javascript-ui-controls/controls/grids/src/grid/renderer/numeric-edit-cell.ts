import { extend, Internationalization, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { isEditable, getComplexFieldID, getObject, createEditElement } from '../base/util';

/**
 * `NumericEditCell` is used to handle numeric cell type editing.
 * @hidden
 */
export class NumericEditCell implements IEditCell {

    private parent: IGrid;
    private obj: NumericTextBox;
    private instances: Internationalization;

    constructor(parent?: IGrid) {
        this.parent = parent;
    }

    private keyEventHandler(args: KeyboardEventArgs): void {
        if (args.keyCode === 13 || args.keyCode === 9 ) {
            let evt: Event = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            /* tslint:disable-next-line:no-any */
            (this as any).dispatchEvent(evt);
          }
    }

    public create(args: { column: Column, value: string }): Element {
        this.instances = new Internationalization(this.parent.locale);
        return createEditElement(this.parent, args.column, 'e-field', {});
    }

    public read(element: Element): number {
        return this.obj.value;
    }

    public write(args: { rowData: Object, element: Element, column: Column, row: HTMLElement, requestType: string }): void {
        let col: Column = args.column;
        let isInline: boolean = this.parent.editSettings.mode !== 'Dialog';
        this.obj = new NumericTextBox(extend(
            {
                value: parseFloat(getObject(args.column.field, args.rowData)),
                enableRtl: this.parent.enableRtl,
                placeholder: isInline ? '' : args.column.headerText,
                enabled: isEditable(args.column, args.requestType, args.element),
                floatLabelType: this.parent.editSettings.mode !== 'Dialog' ? 'Never' : 'Always',
                locale: this.parent.locale,
            },
            col.edit.params));
        args.element.setAttribute('name', getComplexFieldID(args.column.field));
        this.obj.appendTo(args.element as HTMLElement);
        this.obj.element.addEventListener('keydown', this.keyEventHandler);
    }

    public destroy(): void {
        if (this.obj && !this.obj.isDestroyed) {
            this.obj.element.removeEventListener('keydown', this.keyEventHandler);
            this.obj.destroy();
        }
    }
}