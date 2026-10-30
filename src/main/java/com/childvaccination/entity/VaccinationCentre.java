
package com.childvaccination.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "vaccination_centres")
public class VaccinationCentre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String centreType;

    @Column(length = 500)
    private String address;

    private String city;

    private String state;

    private String pinCode;

    private String contactNumber;

    @Column(length = 1000)
    private String availableVaccines;

    private String vaccinationDays;

    private String vaccinationTimings;

    private String fees;

    private String mapLink;

    private boolean active = true;

    public VaccinationCentre() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCentreType() {
        return centreType;
    }

    public void setCentreType(String centreType) {
        this.centreType = centreType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAvailableVaccines() {
        return availableVaccines;
    }

    public void setAvailableVaccines(String availableVaccines) {
        this.availableVaccines = availableVaccines;
    }

    public String getVaccinationDays() {
        return vaccinationDays;
    }

    public void setVaccinationDays(String vaccinationDays) {
        this.vaccinationDays = vaccinationDays;
    }

    public String getVaccinationTimings() {
        return vaccinationTimings;
    }

    public void setVaccinationTimings(String vaccinationTimings) {
        this.vaccinationTimings = vaccinationTimings;
    }

    public String getFees() {
        return fees;
    }

    public void setFees(String fees) {
        this.fees = fees;
    }

    public String getMapLink() {
        return mapLink;
    }

    public void setMapLink(String mapLink) {
        this.mapLink = mapLink;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
