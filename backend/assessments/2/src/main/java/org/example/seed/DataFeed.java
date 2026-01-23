package org.example.seed;

import org.example.entity.Event;
import org.example.entity.Role;
import org.example.entity.User;
import org.example.repository.EventRepository;
import org.example.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataFeed implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataFeed.class);

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataFeed(UserRepository userRepository,
                    EventRepository eventRepository,
                    BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedEvents();
    }

    private void seedUsers() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User u = new User();
            u.setUsername("admin");
            u.setPassword(passwordEncoder.encode("AdminPass123"));
            u.setRole(Role.ROLE_ADMIN);
            userRepository.save(u);
            log.info("Seeded admin");
        }

        if (userRepository.findByUsername("alice").isEmpty()) {
            User u = new User();
            u.setUsername("alice");
            u.setPassword(passwordEncoder.encode("UserPass1"));
            u.setRole(Role.ROLE_USER);
            userRepository.save(u);
            log.info("Seeded alice");
        }

        if (userRepository.findByUsername("bob").isEmpty()) {
            User u = new User();
            u.setUsername("bob");
            u.setPassword(passwordEncoder.encode("UserPass2"));
            u.setRole(Role.ROLE_USER);
            userRepository.save(u);
            log.info("Seeded bob");
        }
    }

    private void seedEvents() {
        if (eventRepository.count() == 0) {
            Event e1 = new Event();
            e1.setName("Rock Night");
            e1.setTotalTickets(100);
            e1.setAvailableTickets(100);
            e1.setSoftDeleted(false);

            Event e2 = new Event();
            e2.setName("Tech Conference");
            e2.setTotalTickets(50);
            e2.setAvailableTickets(50);
            e2.setSoftDeleted(false);

            eventRepository.save(e1);
            eventRepository.save(e2);

            log.info("Seeded events");
        }
    }
}
