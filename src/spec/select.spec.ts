import { Component, OnInit, Type, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SelectModule, SelectComponent } from '../ng2-select';
import { SelectItem } from "../index";
import { FormBuilder, FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

const html = ``;

describe('Component: ng2-select', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestSelectEmptyComponent, TestSelectActiveComponent, TestSelectAsyncComponent],
            imports: [SelectModule, FormsModule, ReactiveFormsModule]
        });
        TestBed.overrideComponent(TestSelectEmptyComponent, { set: { template: html } });
    });

    let initializeFixture = <TFixture>(fixtureType: Type<TFixture>, template: string) : ComponentFixture<TFixture> => { 
        TestBed.overrideComponent(fixtureType, { set: { template } });
        let fixture = TestBed.createComponent(fixtureType);
        let context = fixture.componentInstance;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        return fixture;
    };

    it('fixture should not be null', fakeAsync(() => {
        TestBed.overrideComponent(TestSelectActiveComponent, { set: { template: '<div></div>' } });
        let fixture = TestBed.createComponent(TestSelectActiveComponent);
        let context = fixture.componentInstance;
        fixture.detectChanges();
        tick();

        expect(fixture).not.toBeNull();
    }));

    it('does set implement ngModel and sets active internally if using ngModel', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<form [formGroup]="formGroup"><ng-select formControlName="select" [ngModel]="selected" [items]="items"></ng-select></form>');
        let comp = fixture.componentInstance;

        expect(comp.select.value).toBeDefined();
        expect(comp.select.value.length).toBe(1);
        expect(comp.select.value[0].id).toBe(1);
        expect(comp.select.errors).toBeNull();
        expect(comp.select.valid).toBeTruthy();
        expect(comp.select.pristine).toBeTruthy();
        expect(comp.select.touched).toBeFalsy();

        let selectEl = fixture.debugElement.children[0].children[0];
        let selectComponent = <SelectComponent>selectEl.injector.get(SelectComponent);

        expect(selectComponent.active).toBeDefined();
        expect(selectComponent.active.length).toBe(1);
        expect(selectComponent.active[0].id).toBe(1);
    }));

    it('does set disabled if disable called using formControl', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<form [formGroup]="formGroup"><ng-select formControlName="select" [ngModel]="selected" [items]="items"></ng-select></form>');
        let comp = fixture.componentInstance;
        let selectEl = fixture.debugElement.children[0].children[0];
        let selectComponent = <SelectComponent>selectEl.injector.get(SelectComponent);

        expect(selectComponent.disabled).toBeFalsy();
        comp.select.disable();
        expect(selectComponent.disabled).toBeTruthy();
    }));

    it('does set enabled if enabled called using formControl', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<form [formGroup]="formGroup"><ng-select formControlName="select" [ngModel]="selected" [items]="items"></ng-select></form>');
        let comp = fixture.componentInstance;
        let selectEl = fixture.debugElement.children[0].children[0];
        let selectComponent = <SelectComponent>selectEl.injector.get(SelectComponent);

        comp.select.disable();
        comp.select.enable();
        expect(selectComponent.disabled).toBeFalsy();
    }));

    let openOptions = ( ngSelectElement: DebugElement) => { 
        var buttonEl = ngSelectElement.children[0].children[1].children[0];
        buttonEl.nativeElement.click();
    }

    let openAndCloseOptions = ( ngSelectElement: DebugElement) => { 
        openOptions(ngSelectElement);
        ngSelectElement.parent.nativeElement.click();
        tick();
    }

    it('does set call ngModel touched callback if dropdown opened and closed', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<form [formGroup]="formGroup"><ng-select formControlName="select" ngModel [active]="selected" [items]="items" ></ng-select></form>');
        let comp = fixture.componentInstance;

       openAndCloseOptions(fixture.debugElement.children[0].children[0]);
        
        expect(comp.select.touched).toBeTruthy();
    }));

    it('does emit on closed EventEmitter', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<form [formGroup]="formGroup"><ng-select formControlName="select" ngModel [active]="selected" [items]="items" ></ng-select></form>');
        let comp = fixture.componentInstance;

        let selectEl = fixture.debugElement.children[0].children[0];
        let select = <SelectComponent>selectEl.injector.get(SelectComponent);

        let called: boolean = false;
        select.closed.subscribe(() => {
            called = true;
        })
        openAndCloseOptions(selectEl);
        
        expect(called).toBeTruthy();
    }));

    it('does apply class dropdown cssClass by default', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<ng-select [active]="selected" [items]="items"></ng-select>');
        let comp = fixture.componentInstance;

        let selectEl = fixture.debugElement.children[0].children[0];
        expect(selectEl.nativeElement.classList.contains('dropdown')).toBeTruthy();
        expect(selectEl.nativeElement.classList.contains('dropup')).toBeFalsy();
    }));

    it('does apply class dropup when dropdown is false', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectActiveComponent, 
             '<ng-select [dropdown]="false" [active]="selected" [items]="items"></ng-select>');
        let comp = fixture.componentInstance;

        let selectEl = fixture.debugElement.children[0].children[0];
        expect(selectEl.nativeElement.classList.contains('dropup')).toBeTruthy();
        expect(selectEl.nativeElement.classList.contains('dropdown')).toBeFalsy();
    }));

    it('does display options when items added after typing', fakeAsync(() => {
        let fixture = initializeFixture(TestSelectAsyncComponent, 
             '<ng-select (typed)="onFilterChanged($event)" [items]="items"></ng-select>');
        let comp = fixture.componentInstance;

        let selectEl = fixture.debugElement.children[0];
        let select = <SelectComponent>selectEl.injector.get(SelectComponent);
        openOptions(selectEl);
        fixture.detectChanges();
        let inputEl = selectEl.children[0].children[1];
        inputEl.nativeElement.value = 'T';
        inputEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown',{
            "key": "T"
        }));

        tick();
        fixture.detectChanges();

        let optionsUlEl = selectEl.children[0].children[2];
        expect(optionsUlEl.children.length).toBe(3); // count of items in options.
    }));
});

class CustomSelectItemObject {
    constructor(public name?: string, public identifier?: string) {
    }
}

@Component({
    selector: 'select-test',
    template: '<ng-select></ng-select>'
})
class TestSelectEmptyComponent { }

@Component({
    selector: 'select-active-test',
    template: '<ng-select [items]="items"></ng-select>'
})
class TestSelectActiveComponent implements OnInit {
    formGroup: FormGroup;
    select: FormControl;
    items: Array<SelectItem> = new Array<SelectItem>();
    selected: Array<SelectItem>;
    /**
     *
     */
    constructor(private builder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.select = this.builder.control(null, Validators.required);
        this.formGroup = this.builder.group({
            'select': this.select
        });

        setTimeout(() => {
            this.items.push(new SelectItem({ id: 1, text: 'Item 1' }));
            this.items.push(new SelectItem({ id: 2, text: 'Item 2' }));
            this.items.push(new SelectItem({ id: 3, text: 'Item 3' }));

            this.selected = [this.items[0]];
        });
    }
}

@Component({
    selector: 'select-active-test',
    template: '<ng-select [items]="items"></ng-select>'
})
class TestSelectAsyncComponent implements OnInit {
    items: Array<SelectItem>;

    constructor(private builder: FormBuilder) {
    }

    public onFilterChanged(filterText: string): void{
        setTimeout(() => {
            this.items = [
                new SelectItem({ id: 1, text: '***' + filterText + '***'}),
                new SelectItem({ id: 2, text: '***' + filterText + '***'}),
                new SelectItem({ id: 3, text: '***' + filterText + '***'})
            ];
        });
    }
}
