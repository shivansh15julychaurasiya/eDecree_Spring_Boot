package com.efiling.response;



import java.util.Date;

public class ErrorResponse {

    private Date timestamp;
    private String error;
    private String message;

    public ErrorResponse(Date timestamp, String error, String message) {
        this.timestamp = timestamp;
        this.error = error;
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }
}