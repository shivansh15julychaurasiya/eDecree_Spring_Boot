package com.efiling.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efiling.entity.Lookup;

@Repository
public interface LookupRepository extends JpaRepository<Lookup, Long> {

    // Find by set name
    List<Lookup> findByLkSetname(String lkSetname);

    // Find by value
   // Optional<Lookup> findByLkValue(String lkValue);

    // Find by set name and value
//    Optional<Lookup> findByLkSetnameAndLkValue(String lkSetname, String lkValue);

    // Find by long name (case insensitive)
    List<Lookup> findByLkLongnameIgnoreCase(String lkLongname);

    // Custom query example (if needed)
    // @Query("SELECT l FROM Lookup l WHERE l.lk_setname = :setName")
    // List<Lookup> getBySetName(@Param("setName") String setName);
}