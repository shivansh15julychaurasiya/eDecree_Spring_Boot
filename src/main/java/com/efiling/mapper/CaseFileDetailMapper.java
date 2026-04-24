package com.efiling.mapper;

import java.util.List;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import com.efiling.dto.CaseFileDetailDTO;
import com.efiling.entity.CaseFileDetail;
@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CaseFileDetailMapper {

    CaseFileDetailDTO toDTO(CaseFileDetail entity);

    List<CaseFileDetailDTO> toDTOList(List<CaseFileDetail> entities);

    CaseFileDetail toEntity(CaseFileDetailDTO dto);

    // SAFE mapping for nested object
    @AfterMapping
    default void mapCaseType(CaseFileDetail entity,
                            @MappingTarget CaseFileDetailDTO dto) {

        if (entity.getCaseType() != null) {
            dto.setCaseType(entity.getCaseType().getCtId());
        }
    }
}