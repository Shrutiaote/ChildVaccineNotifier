
package com.childvaccination.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.childvaccination.entity.VaccinationCentre;

public interface VaccinationCentreRepository
        extends JpaRepository<VaccinationCentre, Long> {

	
	 // Search centres by city
    List<VaccinationCentre> findByCityContainingIgnoreCase(String city);

    // Search centres by PIN code
    List<VaccinationCentre> findByPinCode(String pinCode);
    
    List<VaccinationCentre> findByCentreTypeIgnoreCase(String centreType);
}
