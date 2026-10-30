
package com.childvaccination.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.childvaccination.entity.Child;
import com.childvaccination.repository.ChildRepository;

@Service
public class ChildService {

    private final ChildRepository childRepository;

    public ChildService(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    public Child saveChild(Child child) {
        return childRepository.save(child);
    }

    public List<Child> getAllChildren() {
        return childRepository.findAll();
    }

    public Child getChildById(Long id) {
        return childRepository.findById(id).orElse(null);
    }

    public void deleteChild(Long id) {
        childRepository.deleteById(id);
    }
    
}
