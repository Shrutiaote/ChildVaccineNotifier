
package com.childvaccination.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.childvaccination.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Long> {

}
