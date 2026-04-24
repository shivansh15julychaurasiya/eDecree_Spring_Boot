package com.efiling.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efiling.entity.RoleObject;

@Repository
public interface RoleObjectRepository extends JpaRepository<RoleObject, Long> {

 

    List<RoleObject> findByRoRoleId(Long roleId);
    
	/* List<RoleObject> findByRo_rec_status(Integer status); */

}