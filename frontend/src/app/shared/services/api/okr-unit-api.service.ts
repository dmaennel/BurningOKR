import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { Observable } from 'rxjs';
import { OkrChildUnitDto } from '../../model/api/OkrUnit/okr-child-unit.dto';
import { OkrUnitSchema } from '../../model/ui/okr-unit-schema';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { OkrDepartmentDto } from '../../model/api/OkrUnit/okr-department.dto';
import { OkrBranchDto } from '../../model/api/OkrUnit/okr-branch.dto';
import { CompanyDto } from '../../model/api/OkrUnit/company.dto';
import { OkrUnitId } from '../../model/id-types';

@Injectable({
  providedIn: 'root'
})
export class OkrUnitApiService {

  constructor(private http: ApiHttpService) { }

  getOkrChildUnitById$(unitId: OkrUnitId): Observable<OkrChildUnitDto> {
    return this.http.getData$<OkrChildUnitDto>(`units/${unitId}`)
      .pipe(
        map((value: OkrChildUnitDto) => {
          if (value.__okrUnitType === 'DEPARTMENT') {
            return plainToClass(OkrDepartmentDto, value);
          } else if (value.__okrUnitType === 'OKR_BRANCH') {
            return plainToClass(OkrBranchDto, value);
          }
        })
      );
  }

  putOkrChildUnit$(okrUnitId: OkrUnitId, okrChildUnit: OkrChildUnitDto): Observable<OkrChildUnitDto> {
    return this.http.putData$<OkrChildUnitDto>(`units/${okrUnitId}`, okrChildUnit)
      .pipe(
        map((value: OkrChildUnitDto) => {
          if (value.__okrUnitType === 'DEPARTMENT') {
            return plainToClass(OkrDepartmentDto, value);
          } else if (value.__okrUnitType === 'OKR_BRANCH') {
            return plainToClass(OkrBranchDto, value);
          }
        })
      );
  }

  deleteOkrChildUnit$(okrUnitId: OkrUnitId): Observable<boolean> {
    return this.http.deleteData$(`units/${okrUnitId}`);
  }

  getOkrUnitSchemaByUnitId$(okrUnitId: OkrUnitId): Observable<OkrUnitSchema[]> {
    return this.http.getData$<OkrUnitSchema[]>(`units/${okrUnitId}/schema`);
  }

  getParentCompanyOfOkrUnit$(okrUnitId: OkrUnitId): Observable<CompanyDto> {
    return this.http.getData$(`units/${okrUnitId}/company`);
  }

  putOkrUnitObjectiveSequence$(departmentId: number, sequenceList: number[]): Observable<number[]> {
    return this.http.putData$(`units/${departmentId}/objectivesequence`, sequenceList);
  }
}
