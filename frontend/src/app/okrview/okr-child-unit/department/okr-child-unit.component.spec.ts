// tslint:disable:rxjs-finnish

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OkrChildUnitComponent } from './okr-child-unit.component';
import { DepartmentMapper } from '../../../shared/services/mapper/department.mapper';
import { OkrChildUnitRoleService } from '../../../shared/services/helper/okr-child-unit-role.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CurrentOkrviewService } from '../../current-okrview.service';
import { ExcelMapper } from '../../excel-file/excel.mapper';
import { CurrentCycleService } from '../../current-cycle.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialTestingModule } from '../../../testing/material-testing.module';
import { OkrChildUnitTabComponent } from '../okr-child-unit-tab/okr-child-unit-tab.component';
import { OkrChildUnitOverviewTabComponent } from '../okr-child-unit-tab-overview/okr-child-unit-overview-tab.component';
import { DepartmentTabTeamComponent } from './department-tab-team/department-tab-team.component';
import { OkrChildUnitPreviewButtonComponent } from '../okr-child-unit-preview-button/okr-child-unit-preview-button.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ObjectiveComponent } from '../../objective/objective.component';
import { DepartmentTeamNewUserComponent } from './department-team-new-user/department-team-new-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ObjectiveContentsComponent } from '../../objective/objective-contents/objective-contents.component';
import { KeyresultComponent } from '../../keyresult/keyresult.component';
import { of } from 'rxjs';
import { OkrDepartment } from '../../../shared/model/ui/OrganizationalUnit/okr-department';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OkrUnitService } from '../../../shared/services/mapper/okr-unit.service';
import { OkrBranch } from '../../../shared/model/ui/OrganizationalUnit/okr-branch';

describe('OkrChildUnitComponent', () => {
  let component: OkrChildUnitComponent;
  let fixture: ComponentFixture<OkrChildUnitComponent>;

  const departmentMapperService: any = {
    getDepartmentById$: jest.fn(),
    putDepartment$: jest.fn(),
    deleteDepartment$: jest.fn()
  };

  const unitMapperService: any = {
    getOkrChildUnitById$: jest.fn(),
    putOkrChildUnit$: jest.fn(),
    deleteOkrChildUnit$: jest.fn()
  };

  const departmentContextRoleService: any = {
    getContextRoleForOkrChildUnit$: jest.fn()
  };
  const router: any = {
    navigate: jest.fn()
  };

  const paramMapGetSpy: any = jest.fn();
  const paramMapGetAllSpy: any = jest.fn();
  const paramMapHasSpy: any = jest.fn();

  const route: any = {
    // tslint:disable-next-line:no-object-literal-type-assertion
    paramMap: of({
      get: paramMapGetSpy,
      getAll: paramMapGetAllSpy,
      has: paramMapHasSpy,
      keys: []
    } as ParamMap)
  };

  const currentOkrViewService: any = {
    browseDepartment: jest.fn(),
    refreshCurrentDepartmentView: jest.fn(),
    refreshCurrentCompanyView: jest.fn()
  };

  const currentCycleService: any = {
    getCurrentCycle$: jest.fn()
  };

  const excelService: any = {};
  const i18n: any = {};

  let department: OkrDepartment;
  let okrBranch: OkrBranch;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OkrChildUnitComponent,
        OkrChildUnitTabComponent,
        OkrChildUnitOverviewTabComponent,
        DepartmentTabTeamComponent,
        OkrChildUnitPreviewButtonComponent,
        CdkDropList,
        ObjectiveComponent,
        DepartmentTeamNewUserComponent,
        ObjectiveContentsComponent,
        KeyresultComponent
      ],
      imports: [SharedModule, MaterialTestingModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: OkrUnitService, useValue: unitMapperService },
        { provide: DepartmentMapper, useValue: departmentMapperService },
        { provide: OkrChildUnitRoleService, useValue: departmentContextRoleService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: CurrentOkrviewService, useValue: currentOkrViewService },
        { provide: CurrentCycleService, useValue: currentCycleService },
        { provide: ExcelMapper, useValue: excelService },
        { provide: I18n, useValue: i18n }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    paramMapGetSpy.mockReset();
    paramMapGetAllSpy.mockReset();
    paramMapHasSpy.mockReset();

    departmentMapperService.getDepartmentById$.mockReset();
    departmentMapperService.getDepartmentById$.mockReturnValue(of(department));
    departmentMapperService.putDepartment$.mockReset();
    departmentMapperService.putDepartment$.mockReturnValue(of(department));
    departmentMapperService.deleteDepartment$.mockReset();
    departmentMapperService.deleteDepartment$.mockReturnValue(of(true));

    unitMapperService.getOkrChildUnitById$.mockReset();
    unitMapperService.getOkrChildUnitById$.mockReturnValue(of(department));
    unitMapperService.putOkrChildUnit$.mockReset();
    unitMapperService.putOkrChildUnit$.mockReturnValue(of(department));
    unitMapperService.deleteOkrChildUnit$.mockReset();
    unitMapperService.deleteOkrChildUnit$.mockReturnValue(of(true));

    currentCycleService.getCurrentCycle$.mockReset();
    currentCycleService.getCurrentCycle$.mockReturnValue(of(null));

    currentOkrViewService.browseDepartment.mockReset();
    currentOkrViewService.refreshCurrentCompanyView.mockReset();
    currentOkrViewService.refreshCurrentDepartmentView.mockReset();

    departmentContextRoleService.getContextRoleForOkrChildUnit$.mockReset();
    departmentContextRoleService.getContextRoleForOkrChildUnit$.mockReturnValue(of(null));

    router.navigate.mockReset();
    router.navigate.mockReturnValue({catch: jest.fn()});

    department = new OkrDepartment(
      1,
      'testDepartment',
      [],
      0,
      'department',
      'master', 'topicSponsor', ['member'],
      true, false);

    okrBranch = new OkrBranch(
      2,
      'testBranch',
      [],
      'testLAbel',
      0,
      [],
      true,
      false
    );
  });

  it('should create', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component)
      .toBeTruthy();
  });

  it('should get okrChildUnit by id given in params', done => {
    paramMapGetSpy.mockReturnValue('1');

    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.okrChildUnit$.subscribe(() => {
      expect(unitMapperService.getOkrChildUnitById$)
        .toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should browse okrChildUnit with id given in params', done => {
    paramMapGetSpy.mockReturnValue('1');

    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.okrChildUnit$.subscribe(() => {
      expect(currentOkrViewService.browseDepartment)
        .toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should getContextRoleForOkrChildUnit$', done => {
    paramMapGetSpy.mockReturnValue('1');

    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.currentUserRole$.subscribe(() => {
      expect(departmentContextRoleService.getContextRoleForOkrChildUnit$)
        .toHaveBeenCalledWith(department);
      done();
    });
  });

  it('toggleChildUnitActive toggles active', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isActive = false;

    component.toggleChildActive(department);

    expect(department.isActive)
      .toBeTruthy();
  });

  it('toggleChildActive toggles active with falsy value', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isActive = null;

    component.toggleChildActive(department);

    expect(department.isActive)
      .toBeTruthy();
  });

  it('toggleChildActive toggles inactive', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isActive = true;

    component.toggleChildActive(department);

    expect(department.isActive)
      .toBeFalsy();
  });

  it('toggleChildActive puts okrChildUnit', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isActive = true;

    component.toggleChildActive(department);

    expect(unitMapperService.putOkrChildUnit$)
      .toHaveBeenCalledWith(department);
  });

  it('queryRemoveChildUnit deletes okrChildUnit', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.queryRemoveChildUnit(department);

    expect(unitMapperService.deleteOkrChildUnit$)
      .toHaveBeenCalled();
  });

  it('onChildUnitDeleted refreshes okrChildUnit view when parent schema is a okrBranch', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isParentUnitABranch = true;

    component.onChildUnitDeleted(department);

    expect(currentOkrViewService.refreshCurrentDepartmentView)
      .toHaveBeenCalled();
  });

  it('onChildUnitDeleted refreshes okrChildUnit view when parent schema is not a okrBranch', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    department.isParentUnitABranch = false;

    component.onChildUnitDeleted(department);

    expect(currentOkrViewService.refreshCurrentCompanyView)
      .toHaveBeenCalled();
  });

  it('canChildUnitBeRemoved can remove departments', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const canBeRemoved: boolean = component.canChildUnitBeRemoved(department);

    expect(canBeRemoved)
      .toBeTruthy();
  });

  it('canChildUnitBeRemoved can remove Branch without ChildUnit', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    okrBranch.okrUnitIds = [];

    const canBeRemoved: boolean = component.canChildUnitBeRemoved(okrBranch);

    expect(canBeRemoved)
      .toBeTruthy();
  });

  it('canChildUnitBeRemoved cannot remove Branch with ChildUnit', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    okrBranch.okrUnitIds = [1, 2, 3];

    const canBeRemoved: boolean = component.canChildUnitBeRemoved(okrBranch);

    expect(canBeRemoved)
      .toBeFalsy();
  });

  it('canChildUnitBeRemoved cannot remove Branch with single ChildUnit', () => {
    fixture = TestBed.createComponent(OkrChildUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    okrBranch.okrUnitIds = [1];

    const canBeRemoved: boolean = component.canChildUnitBeRemoved(okrBranch);

    expect(canBeRemoved)
      .toBeFalsy();
  });

});
