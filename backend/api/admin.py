from django.contrib import admin
from .models import (
    ContactMessage, Service, TeamMember, Job, JobApplication,
    UserProfile, CompanyInfo
)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'description']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'is_active', 'order']
    list_filter = ['is_active', 'position']
    search_fields = ['name', 'position']
    ordering = ['order', 'name']


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'location', 'job_type', 'is_active', 'posted_date']
    list_filter = ['is_active', 'job_type', 'department', 'posted_date']
    search_fields = ['title', 'department', 'location']
    date_hierarchy = 'posted_date'


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'job', 'status', 'applied_date']
    list_filter = ['status', 'applied_date', 'job']
    search_fields = ['first_name', 'last_name', 'email', 'job__title']
    date_hierarchy = 'applied_date'
    readonly_fields = ['applied_date']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'created_at']
    search_fields = ['user__username', 'user__email', 'phone']


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'updated_at']
    search_fields = ['name', 'email']
