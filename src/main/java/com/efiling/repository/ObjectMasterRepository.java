package com.efiling.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.efiling.entity.ObjectMaster;

public interface ObjectMasterRepository extends JpaRepository<ObjectMaster, Long> {

   
    
    
	@Query(value = "SELECT * FROM object_master o " +
		       "WHERE o.om_id IN (" +
		       "    SELECT r.ro_om_mid FROM role_object r " +
		       "    WHERE r.ro_role_id IN (" +
		       "        SELECT ur.ur_role_id FROM user_role ur WHERE ur.ur_um_mid = :userId" +
		       "    ) AND r.ro_rec_status = 1" +
		       ") ORDER BY o.om_object_stages, o.om_id",
		       nativeQuery = true)
		List<ObjectMaster> findUserObjects(@Param("userId") Long userId);
    
    List<ObjectMaster> findByOmRecStatus(Integer status);
    

}